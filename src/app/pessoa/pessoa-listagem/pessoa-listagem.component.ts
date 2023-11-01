import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmEventType, ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Observable, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { Pessoa } from 'src/app/model/pessoa';
import { PessoaService } from 'src/services/pessoa/pessoa.service';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-pessoa-listagem',
  templateUrl: './pessoa-listagem.component.html',
})
export class PessoaListagemComponent {
  public formModel: FormGroup;
  public formPesquisaPessoa: FormGroup;

  contatos = { nome: '', email: '', telefone: '' }
  listaPessoas : Pessoa[];
  first: number = 0;
  rows: number = 2;
  pesquisa: string = "";

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private pessoaService: PessoaService,

  ) {

  }


  ngOnInit() {
    this.createForm();
    this.listagemPessoas(this.pesquisa, this.first, this.rows);
   this.verificarPesquisandoPessoa();

  }

  private createForm() {
    this.formModel = this.fb.group({
      id: null,
      nome: null,
      cpf: null,
      dataNascimento: null,
      contatos: []
    });

    this.formPesquisaPessoa = this.fb.group({
      id: null,
    });
  }





  listagemPessoas(nomePessoa, page, size) {
    this.pessoaService.getPessoasComFiltro(nomePessoa, page, size).subscribe(
      (data: any) => {
        this.listaPessoas = data.content;
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
      },
      () => {}
    )
  }

  mostrarDetalhesContatos: boolean = false;
  detalheContato = {
    pessoa: '', contatos: []
  }


  mostrarCadastro = false;

  cadastroContatos = []


  abrirDetalheContatos(row) {
    this.mostrarDetalhesContatos = !this.mostrarDetalhesContatos;

    this.detalheContato = {
      pessoa: row.nome,
      contatos: row.contatos
    }

  }

  editarPessoa(pessoa: Pessoa) {
    this.formModel.controls['id'].setValue(pessoa.id)
    this.formModel.controls['nome'].setValue(pessoa.nome)
    this.formModel.controls['cpf'].setValue(pessoa.cpf)
    this.formModel.controls['dataNascimento'].setValue(pessoa.dataNascimento)

    this.cadastroContatos = pessoa.contatos;
    this.mostrarCadastro = true
  }

  excluirPessoa(pessoa: Pessoa) {
    this.pessoaService.deletePessoa(pessoa.id).subscribe(
      (data: any) => {
        this.listagemPessoas(this.pesquisa, this.first, this.rows);
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
      },
      () => {}
    )
  }

  abrirCadastro() {
    this.mostrarCadastro = true
  }

  fecharCadastro() {
    this.mostrarCadastro = false
  }

  salvar() {
    this.formModel.value.contatos = this.cadastroContatos;
    if(this.formModel.value.id == null) {
      this.pessoaService.createPessoa(this.formModel.value).subscribe(
        (data: any) => {
          this.mostrarCadastro = false
          this.messageService.add({ severity: 'success', summary: 'Success', detail: "Criado com sucesso" });
          this.listagemPessoas(this.pesquisa, this.first, this.rows);
        },
        (error) => {
          console.log(error)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
        },
        () => {}
      )
    } else {
      this.pessoaService.updatePessoa(this.formModel.value).subscribe(
        (data: any) => {
          this.mostrarCadastro = false
          this.messageService.add({ severity: 'success', summary: 'Success', detail: "Editado com sucesso" });
          this.listagemPessoas(this.pesquisa, this.first, this.rows);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
        },
        () => {}
      )
    }
  }

  adicionarContato() {
    this.cadastroContatos.push({
      nome: this.contatos.nome,
      email: this.contatos.email,
      telefone: this.contatos.telefone,
    })

    this.contatos.nome = null;
    this.contatos.email = null;
    this.contatos.telefone = null;
  }



  removerContato(row) {
    this.cadastroContatos = this.cadastroContatos.filter(a => a != row);
  }


  deletarContato(row) {
    this.confirmationService.confirm({
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
        },
        reject: (type: ConfirmEventType) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                    break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                    break;
            }
        }
    });
}

verificarPesquisandoPessoa() {
  this.pesquisarPessoas().subscribe((pesquisa: any) => {
    if (typeof pesquisa === 'string') {
      this.pesquisa = pesquisa;
      this.listagemPessoas(this.pesquisa, this.first, this.rows);
    }
  });
}

pesquisarPessoas(): Observable<any> {
  return this.formPesquisaPessoa.valueChanges.pipe(debounceTime(1000),
    distinctUntilChanged(),
    switchMap((form) => {
      return of(form.id);
    })
  );
}

onPageChange(event) {
  console.log(event)
  this.first = event.page;
  this.rows = event.rows;

  this.listagemPessoas(this.pesquisa, this.first, this.rows);
}

}


