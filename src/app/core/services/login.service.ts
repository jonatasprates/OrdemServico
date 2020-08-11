import { Usuario } from './../../shared/entity/Usuario';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {

    constructor(private http: HttpClient) {}

    login(email: string, senha: string): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(`usuarios?email=${email}&senha=${senha}`);
    }

}
