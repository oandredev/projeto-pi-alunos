import { Routes } from '@angular/router';

import { Cadastrar } from './pages/cadastrar/cadastrar';

import { Consultar } from './pages/consultar/consultar';

import { Alterar } from './pages/alterar/alterar';

import { Excluir} from './pages/excluir/excluir';

import { Listagem } from './pages/listagem/listagem';
import { Main } from './main/main';


export const routes: Routes = [

{ path: '', component: Main },

{ path: 'cadastrar', component: Cadastrar, title:'Cadastrar' },

{ path: 'consultar', component: Consultar },

{ path: 'alterar/:id', component: Alterar },

{ path: 'excluir', component: Excluir },

{ path: 'listagem', component: Listagem },

{ path: '**', redirectTo: 'consultar' }

];