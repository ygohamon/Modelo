import { Component } from '@angular/core';
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {AuthService} from "../../../service/auth.service";
import {SharedService} from "../../../service/sharedEmail.service";
import {LayoutService} from "../../../layout/service/app.layout.service";

@Component({
    templateUrl: './forgotpassword.component.html',
    styleUrl: '../style.scss',
    providers: [MessageService]
})
export class ForgotPasswordComponent {
  email: any;
  constructor(
    private sharedService: SharedService,
    private messageService: MessageService,
    private router: Router,
    public layoutService: LayoutService,
    private authService: AuthService) {}

	get dark(): boolean {
		return this.layoutService.config().colorScheme !== 'light';
	}

  onForgot(){
    this.authService.forgotPassword(this.email).subscribe(response => {
      this.sharedService.setEmail(this.email); // Define o e-mail no serviço compartilhado
      localStorage.setItem('passedForgotPassword', 'true');
      this.router.navigate(['/auth/verification']);

      // Aqui você pode redirecionar o usuário ou fazer outra ação
    }, err => {
      const errorMessage = err.error.error ? err.error.error : 'Ocorreu um erro desconhecido';
      this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
    });
  }
}
