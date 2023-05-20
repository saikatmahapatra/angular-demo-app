import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsLayoutComponent } from './settings-layout.component';
import { SiteSettingsComponent } from './site-settings/site-settings.component';
import { SiteMetaComponent } from './site-meta/site-meta.component';


@NgModule({
  declarations: [
    SettingsLayoutComponent,
    SiteSettingsComponent,
    SiteMetaComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
