import { Endereco } from './../../shared/entity/Endereco';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CepService {

    constructor(private http: HttpClient) {}

    getCep(cep: string): Observable<Endereco> {
        return this.http.get<Endereco>(`https://viacep.com.br/ws/${cep}/json/`);
    }

}
