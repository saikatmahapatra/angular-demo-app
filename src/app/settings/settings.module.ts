import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsLayoutComponent } from './settings-layout.component';
import { SiteSettingsComponent } from './site-settings/site-settings.component';
import { SiteMetaComponent } from './site-meta/site-meta.component';
import { PrimeNgModule } from '../prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../@shared/shared.module';


@NgModule({
  declarations: [
    SettingsLayoutComponent,
    SiteSettingsComponent,
    SiteMetaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SettingsRoutingModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SettingsModule { }
