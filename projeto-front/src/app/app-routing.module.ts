import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import {AdminGuard, AuthGuard, NewPasswordGuard, VerificationGuard} from "./service/auth.guard";
import { AppLayoutComponent } from "./layout/app.layout.component";

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled'
};

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: '', component: AppLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./components/dashboards/dashboards.module').then(m => m.DashboardsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'usuario',
        data: { breadcrumb: 'Usuarios' },
        loadChildren: () => import('./components/usuario/usuarios.module').then(m => m.UsuariosModule),
        canActivate: [AuthGuard, AdminGuard] // Verifica também se é Admin
      }
    ],
    canActivate: [AuthGuard]
  },
  { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)},
  { path: 'notfound', loadChildren: () => import('./components/notfound/notfound.module').then(m => m.NotfoundModule) },
  { path: '**', redirectTo: '/notfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
