import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    HomeRoutingModule
  ],
  declarations: [HomeComponent],
  bootstrap: [HomeComponent]

})
export class HomeModule { }
