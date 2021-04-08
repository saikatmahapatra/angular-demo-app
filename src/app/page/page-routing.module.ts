import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page.component';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [{
  path: '',
  component: PageComponent,
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
