import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  PageComponent,
  AboutUsComponent
} from './index';

const routes: Routes = [{
  path: '',
  component: PageComponent,
  children: [{
    path: 'about-us',
    component: AboutUsComponent
  }]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
})
export class PageRoutingModule { }
