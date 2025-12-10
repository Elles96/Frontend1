import { Component, inject, signal } from '@angular/core';
import { Field } from '@angular/forms/signals';
import { form, maxLength, minLength, required } from '@angular/forms/signals';
import { LietotajsService } from '../services/lietotajsservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [Field],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  userService: LietotajsService = inject(LietotajsService);
  router: Router = inject(Router);

  // Use username/password for form, but login payload will be mapped to lietotajvards/parole
  userSignal = signal<{ username: string; password: string }>({ username: '', password: '' });

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

  onClick(event?: Event) {
    console.log('Button clicked');
    if (event) event.preventDefault();
    this.errorMsg.set('');
    this.successMsg.set('');
    // Map form values to backend login payload using userSignal
    const { username, password } = this.userSignal();
    const credentials: { lietotajvards: string; parole: string } = {
      lietotajvards: username,
      parole: password
    };
    this.userService.login(credentials).subscribe({
      next: (response: any) => {
        console.log('Login response:', response);
        if (response.status === 200 && response.body !== null) {
          this.successMsg.set('Login successful!');
          console.log('Navigating to /events');
          this.router.navigate(['/events']);
        } else {
          this.errorMsg.set('Login failed. Please check your credentials.');
        }
      },
      error: (error: any) => {
        console.log('Login error:', error);
        this.errorMsg.set('Login error: ' + (error.message || error));
      }
    });
  }






}
