import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import zxcvbn from 'zxcvbn';
import {LayoutService} from "../../../layout/service/app.layout.service";

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['../style.scss'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  passwordStrength: any;
  passwordFeedback: string = '';

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    public layoutService: LayoutService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]]
    });

    // Monitorar mudanças no campo de senha para medir a força
    this.registerForm.get('senha')?.valueChanges.subscribe((password) => {
      this.passwordStrength = zxcvbn(password);
      this.updatePasswordFeedback();
    });
  }

  updatePasswordFeedback() {
    const { score, feedback } = this.passwordStrength;
    switch (score) {
      case 0:
        this.passwordFeedback = 'Utilize caracteres com símbolos, letras maiúsculas ou números';
        break;
      case 1:
        this.passwordFeedback = 'Muito fácil';
        break;
      case 2:
        this.passwordFeedback = 'Fácil';
        break;
      case 3:
        this.passwordFeedback = 'Equilibrado';
        break;
      case 4:
        this.passwordFeedback = 'Difícil';
        break;
      default:
        this.passwordFeedback = '';
    }
  }

  getPasswordStrengthColor(): string {
    if (!this.passwordStrength) return '#e0e0e0';
    switch (this.passwordStrength.score) {
      case 0: return '#ff4d4d'; // Vermelho
      case 1: return '#ff8000'; // Laranja
      case 2: return '#ffff00'; // Amarelo
      case 3: return '#80ff00'; // Verde claro
      case 4: return '#00e600'; // Verde
      default: return '#e0e0e0';
    }
  }

  onRegister() {
    if (this.registerForm.valid && this.passwordStrength.score >= 2) {
      const { cpf, nome, email, senha } = this.registerForm.value;
      const formattedSenha = senha.replace(/\./g, ''); // Remove os pontos da senha
      const formattedCpf = cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos do CPF

      this.authService.register(formattedCpf, nome, email, 'Publico', formattedSenha).subscribe(
        (response) => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Cadastro realizado com sucesso!' });
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 2000);
        },
        (err) => {
          const errorMessage = err.error.error ? err.error.error : 'Ocorreu um erro desconhecido';
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: errorMessage });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'A senha não atende aos requisitos mínimos de segurança.' });
    }
  }
}
