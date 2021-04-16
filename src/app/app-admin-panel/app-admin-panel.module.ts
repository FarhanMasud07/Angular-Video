import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppAdminPanelRoutingModule} from './app-admin-panel-routing.module';
import {AdminPanelDefaultComponent} from './components/admin-panel-default/admin-panel-default.component';
import {AdminPanelComponent} from './components/admin-panel/admin-panel.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [AdminPanelDefaultComponent, AdminPanelComponent],
  imports: [
    CommonModule,
    AppAdminPanelRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
})
export class AppAdminPanelModule {

}
