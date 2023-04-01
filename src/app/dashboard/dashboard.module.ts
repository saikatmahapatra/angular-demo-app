import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { PostComponent } from './post/post.component';
import { DashboardStatComponent } from './dashboard-stat/dashboard-stat.component';
import { FullCalendarComponent } from './full-calendar/full-calendar.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../@shared/shared.module';
import { NewsDetailsComponent } from './post-details/news-details.component';
import { PrimeNgModule } from '../prime-ng.module';

@NgModule({
  declarations: [
    DashboardComponent,
    PostComponent,
    DashboardStatComponent,
    FullCalendarComponent,
    NewsDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    DashboardRoutingModule,
    PrimeNgModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
