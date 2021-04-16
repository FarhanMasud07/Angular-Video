import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppLoginDefaultComponent} from "./components/app-login-default/app-login-default.component";
import {AppLoginComponent} from "./components/app-login/app-login.component";
import {AppSignUpComponent} from "./components/app-sign-up/app-sign-up.component";

const routes: Routes = [
  {
    path: '',
    component: AppLoginDefaultComponent,
    children: [
      {
        path: '',
        component: AppLoginComponent,
      },
      {
        path: 'signup',
        component: AppSignUpComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppLoginRoutingModule { }
