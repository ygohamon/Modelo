import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'gerenciador', data: { breadcrumb: 'Gerenciador' }, loadChildren: () => import('./gerenciador/gerenciador.module').then(m => m.GerenciadorModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class UsuariosRoutingModule { }
