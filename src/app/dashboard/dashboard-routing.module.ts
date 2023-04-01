import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { PostDetailsComponent } from './post-details/post-details.component';
const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'post-details/:id', component: PostDetailsComponent }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
})
export class DashboardRoutingModule { }
