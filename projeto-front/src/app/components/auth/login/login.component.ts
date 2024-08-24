import { Component } from '@angular/core';
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {LayoutService} from "../../../layout/service/app.layout.service";
@Component({
	templateUrl: './login.component.html',
  styleUrl: '../style.scss',
  providers: [MessageService]
})
export class LoginComponent {

  email: any;
  senha: any;
	constructor(private messageService: MessageService, private router: Router, public layoutService: LayoutService, private authService: AuthService) {}

  onLogin() {
    this.authService.login(this.email, this.senha).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Seja Bem Vindo ao projeto!' });
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 2 * 1000); // 3 segundos * 1000 milissegundos/segundo

      console.log('ta batendo')
    }, err => {
      const errorMessage = err.error.error ? err.error.error : 'Ocorreu um erro desconhecido';
      this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage});
    });
  }
}
