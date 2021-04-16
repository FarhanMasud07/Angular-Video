import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModeThemeSwitchComponent} from './components/mode-theme-switch/mode-theme-switch.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FlexLayoutModule} from "@angular/flex-layout";


@NgModule({
  declarations: [ModeThemeSwitchComponent],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    FlexLayoutModule,
  ],
  exports: [
    ModeThemeSwitchComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppSharedModule {
}
