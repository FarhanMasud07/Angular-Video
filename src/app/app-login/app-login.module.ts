import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppLoginRoutingModule} from './app-login-routing.module';
import {AppLoginComponent} from './components/app-login/app-login.component';
import {AppLoginDefaultComponent} from './components/app-login-default/app-login-default.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppSignUpComponent} from './components/app-sign-up/app-sign-up.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from "@angular/material/button";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSidenavModule} from "@angular/material/sidenav";
import {ExtendedModule, FlexModule} from "@angular/flex-layout";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@NgModule({
  declarations: [AppLoginComponent, AppLoginDefaultComponent, AppSignUpComponent],
  imports: [
    CommonModule,
    AppLoginRoutingModule,
    FormsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSidenavModule,
    FlexModule,
    ExtendedModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatProgressBarModule
  ],
  exports: [AppLoginComponent],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppLoginModule {
}
