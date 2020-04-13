import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import {
  AppService,
  DynamicComponentService,
  ApiService,
  ActionsService,
  StateService
  } from './services';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    MatDialogModule,
    HttpClientModule,
    SharedModule
  ],
  exports: [BrowserAnimationsModule],
  providers: [
    AppService,
    DynamicComponentService,
    ApiService,
    ActionsService,
    StateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
