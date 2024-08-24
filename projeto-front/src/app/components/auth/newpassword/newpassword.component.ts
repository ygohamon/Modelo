import { Component } from '@angular/core';
import {SharedService} from "../../../service/sharedEmail.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {AuthService} from "../../../service/auth.service";
import {LayoutService} from "../../../layout/service/app.layout.service";
@Component({
	templateUrl: './newpassword.component.html',
  styleUrl: '../style.scss',
  providers: [MessageService]

})
export class NewPasswordComponent {

	rememberMe: boolean = false;
  email: string;
  codigo: string;
  newPassword: any;
  confirmPassword: any;
  constructor(
    private sharedService: SharedService,
    private messageService: MessageService,
    private router: Router,
    public layoutService: LayoutService,
    private authService: AuthService) {
    this.email = this.sharedService.getEmail(); // Recupera o e-mail do serviço compartilhado
    this.codigo = this.sharedService.getCodigo();
  }

	get dark(): boolean {
		return this.layoutService.config().colorScheme !== 'light';
	}

  onNewPassword(){
    if (this.newPassword === this.confirmPassword) {
      this.authService.newPassword(this.email, this.codigo, this.confirmPassword ).subscribe(response => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Senha trocada com sucesso!' });
        localStorage.setItem('passedForgotPassword', 'false');
        localStorage.setItem('passedVerification', 'false');

        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2 * 1000); // 3 segundos * 1000 milissegundos/segundo
        // Aqui você pode redirecionar o usuário ou fazer outra ação
      }, err => {
        const errorMessage = err.error.error ? err.error.error : 'Ocorreu um erro desconhecido';
        this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'As senhas estão diferentes, por favor verifique se esta digitando corretamente!' });
    }

  }
}
