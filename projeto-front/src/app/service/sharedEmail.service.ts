import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private email!: string;
  private codigo!: string;

  setEmail(email: string) {
    this.email = email;
  }

  getEmail() {
    return this.email;
  }

  setCodigo(codigo: string) {
    this.codigo = codigo;
  }

  getCodigo() {
    return this.codigo;
  }
}
