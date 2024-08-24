import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {GerenciadorComponent} from "./gerenciador.component";

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: GerenciadorComponent }
  ])],
  exports: [RouterModule]
})
export class GerenciadorRoutingModule { }
