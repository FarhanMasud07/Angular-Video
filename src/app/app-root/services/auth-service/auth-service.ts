import {BehaviorSubject, of} from "rxjs";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {Router} from "@angular/router"
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import decode from "jwt-decode";
import {ErrorLink, ErrorResponse} from "apollo-link-error";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {map, tap, mapTo, catchError} from "rxjs/operators";
import {CookieService} from "ngx-cookie-service";
import {error, promise} from "selenium-webdriver";


@Injectable()
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string | any;

  isAuthenticated = new BehaviorSubject(false);

  constructor(
    private apollo: Apollo,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private http: HttpClient
  ) {

  }

  singUp(email?: string, password?: string) {
    this.apollo
      .mutate({
        mutation: gql`
        mutation{
          UserRegistration(user:{
             email: ${email}
             password: ${password}
          }){
            email
          }
        }`,
        variables: {email, password}
      })
      .subscribe((response: any) => {
        console.log(response);
      });

  }


  login(user: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`http://localhost:3001/login`, user)
      .pipe(map((response: any) => {
        if (response) {
          this.doLoginUser(user.email, response);
          return response;
        }
        return null;
      }));
  }

  logout() {
    return this.http.post<any>(`http://localhost:3001/logout`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        return of(false);
      }));
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.http.post<any>(`http://localhost:3001/refresh-token`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: any) => {
      this.storeJwtToken(tokens.jwt);
    }));
  }

  getJwtToken(): any {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(email: string, tokens: any) {
    this.loggedUser = email;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  getRefreshToken(): any {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: any) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

}

