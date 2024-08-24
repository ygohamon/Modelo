import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class VerificationGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('passedForgotPassword')) {
      return true;
    } else {
      this.router.navigate(['/auth/forgotpassword']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class NewPasswordGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('passedVerification')) {
      return true;
    } else {
      this.router.navigate(['/auth/newpassword']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    const userProfile = localStorage.getItem('userProfile'); // Ou obtenha via serviço

    if (userProfile === 'Admin') {
      return true;
    } else {
      this.router.navigate(['/notfound']); // Ou qualquer rota de acesso negado
      return false;
    }
  }
}
