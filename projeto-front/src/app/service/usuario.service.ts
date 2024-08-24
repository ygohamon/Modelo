import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment";

interface user {
  USERS: {
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
export class UsuarioService {
  constructor(private http: HttpClient) {}

  private baseUrl = environment.API_URL; // URL do seu backend
  private token = localStorage.getItem('authToken');

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}` // Certifique-se de que authToken contém o token JWT
      })
    };
  }

  getUser() {
    return this.http.get<user>(`${this.baseUrl}/USERS/list`, this.getHttpOptions());
  }

  updateUser(userId: string, userData: any) {
    return this.http.put(`${this.baseUrl}/USERS/update/${userId}`, userData, this.getHttpOptions());
  }


  deleteUser(userId: string) {
    return this.http.delete(`${this.baseUrl}/USERS/delete/${userId}`, this.getHttpOptions());
  }
}
