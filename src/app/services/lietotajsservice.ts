import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Lietotajs } from '../models/lietotajsmodel';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class LietotajsService {

  private readonly URL: string = environment.apiUrl;

  http = inject(HttpClient);

  public deleteAccount(userId: number) {
    return this.http.delete<void>(`${this.URL}/${userId}`, {
      observe: 'response'
    });
  }

  public register(user: Lietotajs): Observable<any> {
    return this.http.post<number>(this.URL + '/register', user, {
      observe: 'response'
    });
  }

  public login(credentials: { lietotajvards: string, parole: string }): Observable<any> {
    return this.http.post<string>(this.URL + '/login', credentials, {
      observe: 'response'
    });
  }

}
