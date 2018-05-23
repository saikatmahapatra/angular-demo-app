import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageComponent } from './page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PageRoutingModule } from './page-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,

    PageRoutingModule
  ],
  declarations: [
    PageComponent,
    AboutUsComponent
  ]
})
export class PageModule { }
