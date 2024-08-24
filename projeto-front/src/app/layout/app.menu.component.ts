import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

  model: any[] = [];

  ngOnInit() {
    const userProfile = localStorage.getItem('userProfile'); // Ou obtenha de um serviço

    this.model = [
      {
        label: 'Dashboards',
        icon: 'pi pi-home',
        items: [
          {
            label: 'E-Commerce',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/home']
          },
          {
            label: 'Table',
            icon: 'pi pi-fw pi-table',
            routerLink: ['/table']
          }
        ]
      },
    ];

    // Apenas adiciona o Gerenciador de Usuários se o perfil for 'Admin'
    if (userProfile === 'Admin') {
      this.model.push({
        label: 'Usuarios',
        items: [
          {
            label: 'Gerenciador de Usuario',
            icon: 'pi pi-fw pi-users',
            routerLink: ['/usuario/gerenciador']
          }
        ]
      });
    }
  }
}
