import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from './auth-service';
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import decode from "jwt-decode";

@Injectable()
export class LoggedInAuthGuardService implements CanActivate {

  constructor(public authService: AuthService, public router: Router) {
  }

  canActivate() {
    return this.loggedInAuthGuard();
  }

  private loggedInAuthGuard() {
    const jwtToken: string | any = this.authService.getJwtToken()
      ? this.authService.getJwtToken() : null;
    const jwtRefreshToken: string | any = this.authService.getRefreshToken()
      ? this.authService.getRefreshToken() : null;
    if (jwtRefreshToken && jwtToken) {
      const jwtDecodedToken: string | any = decode(jwtToken);
      const jwtDecodedRefreshToken: string | any = decode(jwtRefreshToken);

      // for node  js
      const admin = jwtDecodedToken.roles[jwtDecodedToken?.roles?.indexOf('admin')];
      const customer: string = jwtDecodedToken.roles[jwtDecodedToken?.roles?.indexOf('customer')];


      if ((Date.now() < Number(jwtDecodedRefreshToken.exp) * 1000)
        &&(admin === 'admin')) {
        this.router.navigate(['/admin']);
        return false;
      }
      if ((Date.now() < Number(jwtDecodedRefreshToken.exp) * 1000)
        && (customer === 'customer')) {
        this.router.navigate(['/dashboard']);
        return false;
      }

      this.authService.removeTokens();
      return true;

    }

    this.authService.removeTokens();
    return true;
  }
}
