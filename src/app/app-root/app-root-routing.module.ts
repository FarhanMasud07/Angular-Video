import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from "./services/auth-service/auth-guard-service";
import {LoggedInAuthGuardService} from "./services/auth-service/LoggedIn-Auth-Guard";
import {RoleGuardService} from "./services/auth-service/auth-role-guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../app-login/app-login.module')
      .then((m) => m.AppLoginModule),
    canActivate: [LoggedInAuthGuardService]

  },
  {
    path: 'admin',
    loadChildren: () => import('../app-admin-panel/app-admin-panel.module')
      .then((m) => m.AppAdminPanelModule),
    canActivate: [RoleGuardService],
    data: {
      expectedRole: 'admin',
    },
  },
  {
    path: 'dashboard',
    loadChildren: () => import('../app-dashboard/app-dashboard.module')
      .then((m) => m.AppDashboardModule),
    canActivate: [RoleGuardService],
    data: {
      expectedRole: 'customer',
    },
  },

  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRootRoutingModule {
}
