import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pessoa } from 'src/app/model/pessoa';


@Injectable()
export class PessoaService {

    private URL = environment.baseServer + '/pessoas';

    constructor(private http: HttpClient) {

    }

    getPessoasComFiltro(pessoa: string, page: number, size: number): Observable<Pessoa[]> {
      const params = new HttpParams()
        .set('pessoa', pessoa)
        .set('page', page.toString())
        .set('size', size.toString());

      console.log(params)

      return this.http.get<Pessoa[]>(`${this.URL}/filtro`, { params });
    }

    getPessoaById(id): Observable<Pessoa> {
      return this.http.get<Pessoa>(this.URL + '/' + id);
    }

    createPessoa(pessoa: Pessoa) {
      console.log(pessoa)
      pessoa.dataNascimento = new Date();
      pessoa.dataNascimento.setDate(pessoa.dataNascimento.getDate() - 2);
      return this.http.post(this.URL, pessoa);
    }

    updatePessoa(pessoa) {
      return this.http.put<Pessoa>(this.URL + '/' + pessoa.id, pessoa);
    }

    deletePessoa(id) {
        return this.http.delete(this.URL + '/' + id);
    }
}

