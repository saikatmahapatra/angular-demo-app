import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { KoreAiModule } from '../kore-ai/kore-ai.module';
import { HomeLayoutComponent } from './home-layout.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    HttpClientModule,
    HomeRoutingModule,
    KoreAiModule
  ],
  declarations: [HomeComponent, HomeLayoutComponent],
  bootstrap: [HomeComponent]

})
export class HomeModule { }
