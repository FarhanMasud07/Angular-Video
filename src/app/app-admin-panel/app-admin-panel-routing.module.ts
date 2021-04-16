import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminPanelDefaultComponent} from './components/admin-panel-default/admin-panel-default.component';
import {AdminPanelComponent} from "./components/admin-panel/admin-panel.component";

const routes: Routes = [
  {
    path: '',
    component: AdminPanelDefaultComponent,
    children: [
      {
        path: '',
        component: AdminPanelComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppAdminPanelRoutingModule { }
