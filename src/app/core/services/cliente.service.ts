import { HttpClient } from '@angular/common/http';
import { Observable, merge } from 'rxjs';
import { Cliente } from 'src/app/shared/entity/Cliente';
import { Injectable } from '@angular/core';

@Injectable()
export class ClienteService {

    constructor(private http: HttpClient) {}

    getClientes(): Observable<Cliente[]> {
        return this.http.get<Cliente[]>('clientes');
    }

    create(cliente: Cliente): Observable<Cliente> {
        return this.http.post<Cliente>('clientes', cliente);
    }

    getClienteById(clienteId: number): Observable<Cliente> {
        return this.http.get<Cliente>('clientes/' + clienteId);
    }

    update(cliente: Cliente): Observable<Cliente> {
        return this.http.put<Cliente>(`clientes/${cliente.id}`, cliente);
    }

    delete(clienteId: number): Observable<any> {
        return this.http.delete<Cliente>(`clientes/${clienteId}`);
    }

    // search(nome: string): Observable<Cliente[]> {
    //     const clientesPorNome = this.http.get<Cliente[]>(`clientes?nome_like=${nome}`);
    //     const clientesPorRazaoSocial = this.http.get<Cliente[]>(`clientes?razaoSocial_like=${nome}`);
    //     return merge(clientesPorNome, clientesPorRazaoSocial);
    // }

    searchNome(nome: string): Observable<Cliente[]> {
        return this.http.get<Cliente[]>(`clientes?nome_like=${nome}`);
    }

}
