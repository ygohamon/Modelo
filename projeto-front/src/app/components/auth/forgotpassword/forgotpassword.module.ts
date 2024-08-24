import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordRoutingModule } from './forgotpassword-routing.module';
import { ForgotPasswordComponent } from './forgotpassword.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {FormsModule} from "@angular/forms";
import {PaginatorModule} from "primeng/paginator";
import {ToastModule} from "primeng/toast";
import {AppConfigModule} from "../../../layout/config/app.config.module";

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    ForgotPasswordRoutingModule,
    AppConfigModule,
    FormsModule,
    PaginatorModule,
    ToastModule
  ],
    declarations: [ForgotPasswordComponent]
})
export class ForgotPasswordModule { }
