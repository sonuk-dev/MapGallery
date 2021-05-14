import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth/auth.component';

import { MatFormFieldModule } from '@angular/material/form-field';
// import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
// import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AuthComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    AuthComponent
  ]
})
export class AuthModule { }