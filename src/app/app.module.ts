import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PessoaListagemComponent } from './pessoa/pessoa-listagem/pessoa-listagem.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { PessoaService } from 'src/services/pessoa/pessoa.service';
import { ContatoService } from 'src/services/contato/contato.service';
import { HttpClientModule } from '@angular/common/http';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';


const primeNg = [
  TableModule,
  ButtonModule,
  InputTextModule,
  AccordionModule,
  DialogModule,
  CalendarModule,
  FormsModule,
  ReactiveFormsModule,
  ConfirmDialogModule,
  MessagesModule,
  HttpClientModule,
  PaginatorModule,
  ToastModule

]


@NgModule({
  declarations: [
    PessoaListagemComponent,
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    primeNg
  ],
  providers: [ConfirmationService, MessageService, PessoaService, ContatoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
