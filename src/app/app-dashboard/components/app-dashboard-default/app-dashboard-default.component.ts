import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../app-root/services/auth-service/auth-service";
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";

@Component({
  selector: 'app-app-dashboard-default',
  templateUrl: './app-dashboard-default.component.html',
  styleUrls: ['./app-dashboard-default.component.scss']
})
export class AppDashboardDefaultComponent implements OnInit {
  token: string | any;
  refreshToken: string | any;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('JWT_TOKEN');
    this.refreshToken = localStorage.getItem('REFRESH_TOKEN');
    console.log(this.token, this.refreshToken)
  }

  logOut() {
    this.authService.logout();
  }

  // onPaySubmit() {
  //   this.http.post<any>('http://localhost:3001/ssl-payment', {
  //     customer_name: 'John Doe',
  //     customer_mobile: '01711xxxxxx',
  //     customer_email: 'you@example.com',
  //     amount: 1200
  //   })
  //     .subscribe((response: any) => {
  //       console.log(response);
  //     });
  // }
}
