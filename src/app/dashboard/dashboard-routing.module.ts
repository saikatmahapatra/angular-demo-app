import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'news-details/:id', component: NewsDetailsComponent }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
})
export class DashboardRoutingModule { }
