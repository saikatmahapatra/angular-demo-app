import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page.component';
import { AboutUsComponent } from './about-us/about-us.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: PageComponent },
      { path: 'about-us', component: AboutUsComponent }
    ])
  ],
  declarations: [
    PageComponent,
    AboutUsComponent
  ]
})
export class PageModule { }
