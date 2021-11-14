import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { KoreAiModule } from '../kore-ai/kore-ai.module';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    HttpClientModule,
    HomeRoutingModule,
    KoreAiModule
  ],
  declarations: [HomeComponent],
  bootstrap: [HomeComponent]

})
export class HomeModule { }
