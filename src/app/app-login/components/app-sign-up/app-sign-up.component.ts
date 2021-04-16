import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../app-root/services/auth-service/auth-service";

@Component({
  selector: 'app-app-sign-up',
  templateUrl: './app-sign-up.component.html',
  styleUrls: ['./app-sign-up.component.scss']
})
export class AppSignUpComponent implements OnInit {

  email: string | any;
  password: string | any;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.singUp(this.email, this.password);
  }
}
