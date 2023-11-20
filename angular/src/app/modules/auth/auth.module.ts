import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './pages/register/register.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    RegisterComponent,
    SignInComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AuthModule { }
