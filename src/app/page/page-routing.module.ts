import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageComponent } from './page.component';
import { AboutUsComponent } from './about-us/about-us.component';

const router: Routes = [{
  path: '',
  component: PageComponent,
  children: [{
    path: 'about-us',
    component: AboutUsComponent
  }]
}];

@NgModule({
  imports: [
    RouterModule.forChild(router)
  ],
})
export class PageRoutingModule { }
