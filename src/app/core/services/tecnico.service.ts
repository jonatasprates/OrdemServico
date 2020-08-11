import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Tecnico } from 'src/app/shared/entity/Tecnico';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TecnicoService {

    constructor(private http: HttpClient) {}

    getTecnicos(): Observable<Tecnico[]> {
        return this.http.get<Tecnico[]>('tecnicos');
    }

    create(tecnico: Tecnico): Observable<Tecnico> {
        return this.http.post<Tecnico>('tecnicos', tecnico);
    }

    getTecnicoById(tecnicoId: number): Observable<Tecnico> {
        return this.http.get<Tecnico>('tecnicos/' + tecnicoId);
    }

    update(tecnico: Tecnico): Observable<Tecnico> {
        return this.http.put<Tecnico>(`tecnicos/${tecnico.id}`, tecnico);
    }

    delete(tecnicoId: number): Observable<any> {
        return this.http.delete<Tecnico>(`tecnicos/${tecnicoId}`);
    }
}
