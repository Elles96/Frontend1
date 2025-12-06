import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pasakums } from '../models/pasakums.model';

@Injectable({ providedIn: 'root' })
export class PasakumsService {
  http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/pasakumi'; // Update to your backend URL

  getPasakumi() {
    return this.http.get<Pasakums[]>(this.apiUrl);
  }

  createPasakums(pasakums: Pasakums) {
    return this.http.post<Pasakums>(this.apiUrl, pasakums);
  }
}