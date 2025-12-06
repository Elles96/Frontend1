import { Component, inject, signal } from '@angular/core';
import { Field } from '@angular/forms/signals';
import { Lietotajs } from '../models/lietotajsmodel';
import { form, maxLength, minLength, required } from '@angular/forms/signals';
import { LietotajsService } from '../services/lietotajsservice';
import { Router } from '@angular/router';
// Removed UserGlobalSignal, not present in your project

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, Field],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  userService: LietotajsService = inject(LietotajsService);
  router: Router = inject(Router);

  userSignal = signal<Lietotajs>({ username: '', password: '' });

  loginForm = form(this.userSignal, (p) => {
    required(p.username, { message: 'Username is required' });
    minLength(p.username, 3, { message: 'Username must be at least 3 characters' });
    maxLength(p.username, 25, { message: 'Username cannot exceed 25 characters' });
    required(p.password, { message: 'Password is required' });
    minLength(p.password, 4, { message: 'Password must be at least 4 characters' });
    maxLength(p.password, 50, { message: 'Password cannot exceed 50 characters' });
  });


  errorMsg = signal('');
  successMsg = signal('');

  onClick() {
    this.errorMsg.set('');
    this.successMsg.set('');
    this.userService.login(this.userSignal()).subscribe({
      next: (response: any) => {
        if (response.status === 200 && response.body !== null) {
          this.successMsg.set('Login successful!');
          this.router.navigate(['/events']);
        } else {
          this.errorMsg.set('Login failed. Please check your credentials.');
        }
      },
      error: (error: any) => {
        this.errorMsg.set('Login error: ' + (error.message || error));
      }
    });
  }






}
