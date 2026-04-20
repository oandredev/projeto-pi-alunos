import { Routes } from '@angular/router';
import { Cadastrar } from './pages/cadastrar/cadastrar';
import { Consultar } from './pages/consultar/consultar';
import { Alterar } from './pages/alterar/alterar';
import { Excluir } from './pages/excluir/excluir';
import { Listagem } from './pages/listagem/listagem';
import { Main } from './main/main';

export const routes: Routes = [
  { path: '', component: Main },
  { path: 'cadastrar', component: Cadastrar, title: 'Gestão Escolar | Cadastrar' },
  { path: 'consultar', component: Consultar, title: 'Gestão Escolar | Consultar' },
  { path: 'alterar/:id', component: Alterar, title: 'Gestão Escolar | Editar' },
  { path: 'excluir', component: Excluir, title: 'Gestão Escolar | Excluir' },
  { path: 'listagem', component: Listagem, title: 'Gestão Escolar | Listagem' },
  { path: '**', redirectTo: 'consultar' },
];
