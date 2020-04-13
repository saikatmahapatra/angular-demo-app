import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  PageComponent,
  AboutUsComponent,
  PageLayoutComponent
} from './index';

const routes: Routes = [{
  path: '',
  component: PageLayoutComponent,
  children: [
    { path: '', component: PageComponent },
    { path: 'about-us', component: AboutUsComponent }
  ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
})
export class PageRoutingModule { }
