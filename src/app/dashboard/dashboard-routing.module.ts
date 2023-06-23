import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { AnalyticsComponent } from './analytics/analytics.component';
const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'post-details/:id', component: PostDetailsComponent },
  { path: 'analytics/:entity/:entityId', component: AnalyticsComponent },
  { path: 'my-analytics/:entity/:entityId', component: AnalyticsComponent }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
})
export class DashboardRoutingModule { }
