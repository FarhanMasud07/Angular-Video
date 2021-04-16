import {Component, HostBinding, OnInit} from '@angular/core';
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-root-default',
  templateUrl: './root-default.component.html',
  styleUrls: ['./root-default.component.scss']
})
export class RootDefaultComponent implements OnInit {
  isDark: boolean = false;
  IconName: any = 'ChromeBack';

  constructor() {
  }

  ngOnInit(): void {
    this.getThemeMode();
  }

  private getThemeMode() {
    this.isDark = localStorage.getItem("Mode") === 'Dark' ? true : false;
  }

  checkMode($event: any) {
    this.isDark = $event;
    localStorage.setItem('Mode', this.isDark ? 'Dark' : 'Light');
  }
}
