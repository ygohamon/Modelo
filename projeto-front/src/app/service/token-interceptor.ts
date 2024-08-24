import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Aqui você pega o token de autenticação de algum lugar, como localStorage
    const authToken = localStorage.getItem('authToken');

    // Clonar a requisição para adicionar o cabeçalho de autorização
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });

    // Passar a requisição clonada em vez da original para o próximo manipulador
    return next.handle(authReq);
  }
}
