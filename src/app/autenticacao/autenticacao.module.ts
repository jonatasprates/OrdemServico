import { LoginService } from './../core/services/login.service';
import { LoginComponent } from './login/login.component';
import { AutenticacaoRoutingModule } from './autenticacao-routing.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    AutenticacaoRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    LoginService
  ],
  exports: [

  ]
})
export class AutenticacaoModule { }
