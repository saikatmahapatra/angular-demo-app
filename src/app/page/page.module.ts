import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageRoutingModule } from './page-routing.module';
import { PageComponent } from './page.component';
import { AboutUsComponent } from './about-us/about-us.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    PageRoutingModule
  ],
  declarations: [
    PageComponent,
    AboutUsComponent
  ]
})
export class PageModule { }
