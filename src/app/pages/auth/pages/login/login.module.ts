import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  FormFieldModule,
  InputModule,
  PasswordModule,
  ButtonModule,
  SpinnerModule,
} from '@app/shared';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormFieldModule,
    InputModule,
    PasswordModule,
    ButtonModule,
    SpinnerModule,
  ],
})
export class LoginModule {}
