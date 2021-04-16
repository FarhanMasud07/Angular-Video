import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth-service';
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public authService: AuthService, public router: Router) {
  }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/admin']);
    }
    return !this.authService.isLoggedIn();
  }

  // canActivate() {
  //   return this.simpleAuthGuard();
  // }

  private simpleAuthGuard() {
    return this.authService.isAuthenticated.pipe(map((isLoggedIn: boolean) => {
      if (!isLoggedIn) {
        this.router.navigate(['/'])
        return false;
      } else {
        return true;
      }
    }));
  }
}
