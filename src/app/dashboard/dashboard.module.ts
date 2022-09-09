import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NewsComponent } from './news/news.component';
import { DashboardStatComponent } from './dashboard-stat/dashboard-stat.component';
import { FullCalendarComponent } from './full-calendar/full-calendar.component';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../@shared/shared.module';



@NgModule({
  declarations: [
    DashboardComponent,
    NewsComponent,
    DashboardStatComponent,
    FullCalendarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    DashboardRoutingModule,
    NgxPaginationModule
  ]
})
export class DashboardModule { }
