import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppDashboardRoutingModule } from './app-dashboard-routing.module';
import { AppDashboardDefaultComponent } from './components/app-dashboard-default/app-dashboard-default.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppDashboardDefaultComponent],
  imports: [
    CommonModule,
    AppDashboardRoutingModule,
    HttpClientModule
  ]
})
export class AppDashboardModule { }
