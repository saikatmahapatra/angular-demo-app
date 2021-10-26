import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from './shared/shared.module';
import { ApiService } from './services/api.service';
import { CommonService } from './services/common.service';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    // Routing modules must be at the last and AppRouting Module must be the last one.
    AppRoutingModule
  ],
  exports: [BrowserAnimationsModule, PageNotFoundComponent],
  providers: [
    CommonService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
