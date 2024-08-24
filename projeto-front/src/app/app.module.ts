import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {TokenInterceptor} from "./service/token-interceptor";
import {ToastModule} from "primeng/toast";
import {LoaderModule} from "./components/loader/loader.module";
import {NgxMaskDirective, provideNgxMask} from 'ngx-mask';
import {AppLayoutModule} from "./layout/app.layout.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    AppLayoutModule,
    HttpClientModule,
    FormsModule,
    ToastModule,
    LoaderModule,
    NgxMaskDirective
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    provideNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
