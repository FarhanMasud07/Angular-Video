import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import {AuthService} from './auth-service';
import decode from 'jwt-decode';
import {map} from "rxjs/operators";

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    return this.authRoleGuard(route);
  }

  private authRoleGuard(route: any) {
    const expectedRole = route.data.expectedRole;
    const jwtToken: string | any = this.authService.getJwtToken()
      ? this.authService.getJwtToken() : null;
    const jwtRefreshToken: string | any = this.authService.getRefreshToken()
      ? this.authService.getRefreshToken() : null;
    if (jwtRefreshToken && jwtToken) {
      const jwtDecodedToken: string | any = decode(jwtToken);
      const jwtDecodedRefreshToken: string | any = decode(jwtRefreshToken);

      const admin = jwtDecodedToken?.roles[jwtDecodedToken?.roles?.indexOf('admin')];
      const customer: string = jwtDecodedToken?.roles[jwtDecodedToken?.roles?.indexOf('customer')];

      if ((Date.now() < Number(jwtDecodedRefreshToken.exp) * 1000)
        && (admin === expectedRole)) {
        return true;
      }
      if ((Date.now() < Number(jwtDecodedRefreshToken.exp) * 1000)
        && (customer === expectedRole)) {
        return true;
      }
    }
    this.router.navigate(['/']);
    return false;
  }
}
