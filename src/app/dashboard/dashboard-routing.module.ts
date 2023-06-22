import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { InsightChartComponent } from './insight-chart/insight-chart.component';
const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'post-details/:id', component: PostDetailsComponent },
  { path: 'insight/:entity/:entityId', component: InsightChartComponent },
  { path: 'my-insight/:entity/:entityId', component: InsightChartComponent }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
})
export class DashboardRoutingModule { }
