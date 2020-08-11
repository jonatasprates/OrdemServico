import { OrdemServico } from './../../shared/entity/OrdemServico';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class OrdemServicoService {

    constructor(private http: HttpClient) {}

    getOrdemServicos(): Observable<OrdemServico[]> {
        return this.http.get<OrdemServico[]>('ordemServico?_expand=cliente');
    }

    getOrdemServicoById(id: number): Observable<OrdemServico> {
        return this.http.get<OrdemServico>(`ordemServico/${id}?_expand=cliente&_expand=usuario`);
    }

    delete(id: number): Observable<any> {
        return this.http.delete<OrdemServico>(`ordemServico/${id}`);
    }
}
