import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-mode-theme-switch',
  templateUrl: './mode-theme-switch.component.html',
  styleUrls: ['./mode-theme-switch.component.scss']
})
export class ModeThemeSwitchComponent implements OnInit {

  @Output() darkModeSwitch = new EventEmitter<boolean>();
  isDark: boolean | any;

  constructor() {
  }

  ngOnInit(): void {
    this.getThemeMode();
  }

  private getThemeMode() {
    this.isDark = localStorage.getItem("Mode") === 'Dark' ? true : false;
  }

  onToggleClick($event: MatSlideToggleChange) {
    this.darkModeSwitch.emit($event.checked);
  }
}
