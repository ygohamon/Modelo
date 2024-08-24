import { Component } from '@angular/core';
import { SharedService } from "../../../service/sharedEmail.service";
import { MessageService } from "primeng/api";
import { Router } from "@angular/router";
import { AuthService } from "../../../service/auth.service";
import {LayoutService} from "../../../layout/service/app.layout.service";

@Component({
  templateUrl: './verification.component.html',
  styleUrls: ['../style.scss'],
  providers: [MessageService]
})
export class VerificationComponent {
  codigo!: string;
  email: string;

  constructor(
    private sharedService: SharedService,
    private messageService: MessageService,
    private router: Router,
    public layoutService: LayoutService,
    private authService: AuthService
  ) {
    this.email = this.sharedService.getEmail(); // Recupera o e-mail do serviço compartilhado
  }

  maskEmail(email: string): string | null {
    if (email === undefined) return null;
    const [localPart, domainPart] = email.split('@');

    if (localPart.length > 1) {
      // Pega a primeira letra e adiciona asteriscos, mantendo o domínio intacto
      const maskedLocalPart = localPart[0] + localPart.slice(1).replace(/./g, '*');
      return `${maskedLocalPart}@${domainPart}`;
    }

    // Caso o e-mail não tenha um formato esperado, retorna o original (ou pode optar por outra lógica)
    return email;
  }

  onVerification() {
    if (this.email) {
      this.authService.validationCode(this.email, this.codigo).subscribe(response => {
        this.sharedService.setCodigo(this.codigo); // Define o e-mail no serviço compartilhado
        localStorage.setItem('passedVerification', 'true');
        this.router.navigate(['/auth/newpassword']);
        // Aqui você pode redirecionar o usuário ou fazer outra ação
      }, err => {
        const errorMessage = err.error.error ? err.error.error : 'Ocorreu um erro desconhecido';
        this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
      });
    } else {
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 3 * 1000); // 3 segundos * 1000 milissegundos/segundo
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Sem nenhum email, por favor re-faça o procedimento!' });
    }
  }
}
