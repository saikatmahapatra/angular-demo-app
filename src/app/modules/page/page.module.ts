import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../../shared/shared.module';
import { PageComponent } from './page.component';
import { AboutUsComponent } from './about-us/about-us.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forChild([
      {
        path: '', component: PageComponent,
        children: [
          { path: 'about-us', component: AboutUsComponent }
        ]
      },

    ])
  ],
  declarations: [
    PageComponent,
    AboutUsComponent
  ]
})
export class PageModule { }
