import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contato } from 'src/app/model/contato';


@Injectable()
export class ContatoService {

    private URL = environment.baseServer + '/contatos';

    constructor(private http: HttpClient) {

    }

    getAllContatos(): Observable<Contato[]> {
      return this.http.get<any[]>(`${this.URL}`);
    }

    getContatoById(id): Observable<Contato> {
      return this.http.get<Contato>(this.URL + '/' + id);
    }

    createContato(contato) {
      return this.http.post(this.URL + '/', contato);
    }

    updateContato(id, contato) {
      return this.http.put<Contato>(this.URL + '/' + id, contato);
    }

    deleteContato(id) {
        return this.http.delete(this.URL + '/' + id);
    }
}

