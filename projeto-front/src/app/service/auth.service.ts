import {HttpClient} from '@angular/common/http';
import {tap} from "rxjs";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {jwtDecode} from "jwt-decode";

interface LoginResponse {
  TOKEN: string;
  USUARIO: {
    CPF: string;
    EMAIL: string;
    NOME: string;
    PERFIL: string;
    SENHA: string;
  };
  // Outras propriedades que você espera na resposta, se houver
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.API_URL; // URL do seu backend

  constructor(private http: HttpClient) {}

  // Método para verificar se o usuário está logado
  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    if (!token) return false;

    try {
      // Decodifica o token
      const decodedToken: { exp: number } = jwtDecode(token);

      const currentTime = Date.now() / 1000; // Converte de milissegundos para segundos

      // Verifica se o token expirou
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('authToken'); // Limpa o token se tiver expirado
        return false;
      }

      return true;
    } catch (error) {
      // Tratar erro (por exemplo, token malformado)
      console.error("Erro ao decodificar o token:", error);
      return false;
    }
  }

  login(EMAIL: string, SENHA: string) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, {EMAIL, SENHA}).pipe(
      tap(resposta => {
        const authToken = resposta.TOKEN; // Supondo que a resposta seja { token: '...' }
        const User = resposta.USUARIO
        localStorage.setItem('authToken', authToken);
        // Supondo que 'response' seja a resposta do servidor após um login bem-sucedido
        localStorage.setItem('userProfile', User.PERFIL);

        // Define um timeout para limpar o token após 1 hora (3600 segundos)
        setTimeout(() => {
          localStorage.removeItem('authToken');
        }, 24 * 60 * 60 * 1000);
      })
    );
  }

  register(CPF: string, NOME: string, EMAIL: string, PERFIL: string, SENHA: string) {
    return this.http.post(`${this.baseUrl}/auth/register`, {CPF, NOME, EMAIL, PERFIL, SENHA});
  }

  forgotPassword(EMAIL: string) {
    return this.http.post(`${this.baseUrl}/auth/forgot_password`, {EMAIL});
  }

  validationCode(EMAIL: string, CODE: string) {
    return this.http.post(`${this.baseUrl}/auth/verify_code`, {EMAIL, CODE});
  }

  newPassword(EMAIL: string, CODE: string, SENHA: string) {
    return this.http.post(`${this.baseUrl}/auth/reset_password`, {EMAIL, CODE, SENHA});
  }
}
