
import { Component, inject, signal } from '@angular/core';
import { Lietotajs } from '../models/lietotajs.model';
import { form, Field, maxLength, minLength, required } from '@angular/forms/signals';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [Field],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  userSignal = signal<Lietotajs>({ username: '', password: '', email: '' });

  loginForm = form(this.userSignal, (p) => {
    required(p.username, { message: 'Username is required' });
    minLength(p.username, 3, { message: 'Username must be at least 3 characters' });
    maxLength(p.username, 25, { message: 'Username cannot exceed 25 characters' });

    required(p.password, { message: 'Password is required' });
    minLength(p.password, 4, { message: 'Password must be at least 4 characters' });
    maxLength(p.password, 50, { message: 'Password cannot exceed 50 characters' });
  });

  onLoginClick() {
    this.authService.login({
      username: this.loginForm.username().value(),
      password: this.loginForm.password().value()
    }).subscribe({
      next: (user) => {
        // Optionally update global user signal here
        this.router.navigate(['/events']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        // Optionally show error message to user
      }
    });
  }

  onRegisterClick() {
    this.authService.register({
      username: this.loginForm.username().value(),
      password: this.loginForm.password().value(),
      email: this.loginForm.email().value()
    }).subscribe({
      next: (newUser) => {
        this.router.navigate(['/events']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
      }
    });
  }
}