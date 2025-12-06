import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Lietotajs } from '../models/lietotajsmodel';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class LietotajsService {

  private readonly URL: string = environment.apiUrl;

  http = inject(HttpClient);

  public deleteAccount(userId: number) {
    return this.http.delete<void>(`${this.URL}/user/${userId}`, {
      observe: 'response'
    });
  }

  public login(user: Lietotajs): Observable<any> {
    return this.http.post<number>(this.URL + '/user', user, {
      observe: 'response'
    });
  }

}
