import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoaListagemComponent } from './pessoa/pessoa-listagem/pessoa-listagem.component';

const routes: Routes = [
  {
    path: '', 
    component: PessoaListagemComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
