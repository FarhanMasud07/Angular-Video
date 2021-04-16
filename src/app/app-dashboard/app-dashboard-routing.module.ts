import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppDashboardDefaultComponent} from "./components/app-dashboard-default/app-dashboard-default.component";
const routes: Routes = [
  {
    path: '',
    component: AppDashboardDefaultComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppDashboardRoutingModule { }
