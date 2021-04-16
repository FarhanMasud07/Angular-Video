import {Component, OnInit} from '@angular/core';
import {GqlQueryService} from "../../services/graphql.query.service";
import {Entities, Fields} from "../../../app-config/constants/config.constant";
import {AuthService} from "../../../app-root/services/auth-service/auth-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  events: any;
  email: string | any;
  password: string | any;

  constructor(
    private adminPanelService: GqlQueryService,
    private authService: AuthService,
    private router: Router,

  ) {
  }

  ngOnInit(): void {
    // this.getEvents();
    // this.getUsers();
  }

  // private getEvents() {
  //   const EntityName = Entities.Events;
  //   const FieldsName = Fields.EventsField;
  //
  //   this.adminPanelService.getDataByGql(EntityName, FieldsName).subscribe((response: any) => {
  //     if (response) {
  //       this.events = response.events;
  //     }
  //   })
  // }
  //
  getUsers() {
    const EntityName = Entities.Users;
    const FieldsName = Fields.UsersField;

    this.adminPanelService.getDataByGql(EntityName, FieldsName)
      .subscribe((response: any) => {
        if (response) {
          console.log(response, 'all users data');
        }
      })
  }


  logOut() {
    this.authService.logout();
  }
}
