import { Injectable } from '@angular/core';
import { Aluno } from '../types/types';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlunosService {
  private readonly API = 'http://localhost:3000/alunos';

constructor(private http: HttpClient) {}

//Faz um GET para pegar todos os alunos.

listar(): Observable<Aluno[]> {

return this.http.get<Aluno[]>(this.API);

}

//Faz um POST com um novo aluno para adicionar no banco de dados.

incluir(aluno: Aluno): Observable<Aluno> {

return this.http.post<Aluno>(this.API, aluno);
}

//Faz um DELETE para excluir um aluno no banco de dados.

excluir(id: string): Observable<Aluno> {

return this.http.delete<Aluno>(this.API + `/${id}`);

}

}
