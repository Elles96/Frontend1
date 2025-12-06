import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lietotajs } from '../models/lietotajs.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/lietotaji'; // Update to your backend URL

  login(credentials: { username: string; password: string }) {
    return this.http.post<Lietotajs>(`${this.apiUrl}/login`, credentials);
  }

  register(user: Lietotajs) {
    return this.http.post<Lietotajs>(`${this.apiUrl}/register`, user);
  }
}