import { Injectable, signal } from '@angular/core';
import { Lietotajs } from '../models/lietotajsmodel';

@Injectable({
  providedIn: 'root',
})
export class UserGlobalSignal {

  public userGlobalSignal = signal<Lietotajs & { id: number; email: string }>({ id: 0, username: '', password: '', email: '' });
}
