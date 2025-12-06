import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pasakums } from '../models/pasakumsmodel';
import { environment } from '../environments/environment.prod';

@Injectable({ 
  providedIn: 'root'
 })
export class PasakumsService {

  private readonly URL = environment.apiUrl;
  http = inject(HttpClient);

  getPasakumi() {
    return this.http.get<Pasakums[]>(this.URL + '/pasakumi');
  }

  createPasakums(pasakums: Pasakums) {
    return this.http.post<Pasakums>(this.URL + '/pasakumi', pasakums);
  }
}