import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BootstrapUiRoutingModule } from './bootstrap-ui-routing.module';
import { BootstrapUiComponent } from './bootstrap-ui.component';

@NgModule({
  imports: [
    CommonModule,
    BootstrapUiRoutingModule
  ],
  declarations: [BootstrapUiComponent]
})
export class BootstrapUiModule { }
