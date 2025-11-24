import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Pasakums } from "../models/pasakums.model";

@Injectable ({
    providedIn: 'root',
})
export class PasakumsService {
    private readonly URL: string = 'http://localhost:8080/pasakums';

    private http: HttpClient = Inject(HttpClient);

    getPasakumi(): Observable<Pasakums[]> {
        return this.http.get<Pasakums[]>(this.URL);
    }
}