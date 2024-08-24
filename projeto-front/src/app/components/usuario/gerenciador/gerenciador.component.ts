import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MessageService, SelectItem} from "primeng/api";
import {UsuarioService} from "../../../service/usuario.service";

@Component({
  templateUrl: './gerenciador.component.html',
  styleUrl: './gerenciador.component.scss',
  providers: [MessageService]
})
export class GerenciadorComponent implements OnInit {

  dados: any;
  grupo!: SelectItem[];
  perfil!: SelectItem[];
  dadosOriginais: any = {};

  constructor(private router: Router,
              private user: UsuarioService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.user.getUser().subscribe(data => {
      this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Consulta concluida com sucesso!'});

      this.dados = data.USERS;
    }, err => {
      const errorMessage = err.error.error ? err.error.error : 'Ocorreu um erro ao listar usuarios';
      this.messageService.add({severity: 'error', summary: 'Error', detail: errorMessage});
    });

    this.perfil = [
      {label: 'Admin', value: 'Admin'},
      {label: 'Gestão', value: 'Gestao'},
      {label: 'Publico', value: 'Publico'}
    ];
  }

  onRowEditInit(user: any) {
    this.dadosOriginais[user._id as string] = {...user};
  }

  onRowDelete(userId: any) {
    this.user.deleteUser(userId).subscribe(data => {
      this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Usuario deletado com sucesso!'});
      // Atualizar a lista de usuários removendo o usuário deletado
      this.dados = this.dados.filter((user: any) => user.ID !== userId);
    }, err => {
      const errorMessage = err.error.error ? err.error.error : 'Ocorreu um erro desconhecido';
      this.messageService.add({severity: 'error', summary: 'Error', detail: errorMessage});
    });
  }

  onRowEditSave(userId: any) {
    this.user.updateUser(userId.ID, userId).subscribe({
      next: (response) => {
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Usuario atualizado com sucesso!'});
      },
      error: (err) => {
        const errorMessage = err.error.error ? err.error.error : 'Ocorreu um erro desconhecido';
        this.messageService.add({severity: 'error', summary: 'Error', detail: errorMessage});
      }
    });
  }

  onRowEditCancel(userId: any, index: number) {
    const id = userId._id as string;
    if (this.dadosOriginais.hasOwnProperty(id)) {
      this.dados[index] = this.dadosOriginais[id];
      delete this.dadosOriginais[id];
    }
  }
}
