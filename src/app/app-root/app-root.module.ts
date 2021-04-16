import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRootRoutingModule} from './app-root-routing.module';
import {RootDefaultComponent} from './component/root-default/root-default.component';
import {HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS, HttpRequest} from '@angular/common/http';
import {AuthService} from "./services/auth-service/auth-service";
import {AuthGuardService} from "./services/auth-service/auth-guard-service";
import {LoggedInAuthGuardService} from "./services/auth-service/LoggedIn-Auth-Guard";
import {JwtHelperService, JWT_OPTIONS} from "@auth0/angular-jwt";
import {RoleGuardService} from "./services/auth-service/auth-role-guard";
import {InterceptorService} from "./services/interceptor/interceptor.service";
import {GraphQLModule} from "./graphql.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {AppSharedModule} from "../app-shared/app-shared.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [RootDefaultComponent,],
  imports: [
    BrowserModule,
    AppRootRoutingModule,
    HttpClientModule,
    GraphQLModule,
    AppSharedModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
    BrowserAnimationsModule,
    MatSlideToggleModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [AuthService, AuthGuardService, LoggedInAuthGuardService, RoleGuardService, JwtHelperService,
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS,},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [RootDefaultComponent]
})
export class AppRootModule {
}
