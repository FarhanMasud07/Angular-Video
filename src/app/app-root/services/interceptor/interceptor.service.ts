import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {AuthService} from "../auth-service/auth-service";
import {switchMap, take, filter, catchError} from "rxjs/operators";
import jwt_decode from 'jwt-decode';
import {Router} from "@angular/router";

@Injectable()
export class InterceptorService implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    public authService: AuthService,
    private router: Router,) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.getJwtToken()) {
      request = this.addToken(request, this.authService.getJwtToken());
    }

    return next.handle(request).pipe(catchError(error => {

      const jwtToken: string | any =
        this.authService.getJwtToken()
          ? jwt_decode(this.authService.getJwtToken()) : null;
      const jwtRefreshToken: string | any =
        this.authService.getRefreshToken()
          ? jwt_decode(this.authService.getRefreshToken()) : null;

      if (jwtRefreshToken && Date.now() > Number(jwtRefreshToken.exp) * 1000) {

        this.router.navigate(['/']);
      }
      if (jwtToken && Date.now() > Number(jwtToken.exp) * 1000) {
        return this.handle401Error(request, next);
      } else {
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.jwt);
          return next.handle(this.addToken(request, token.jwt));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }
}
