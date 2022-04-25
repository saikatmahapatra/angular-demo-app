import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NewsComponent } from '../components/news/news.component';
import { DashboardStatComponent } from '../components/dashboard-stat/dashboard-stat.component';
import { FullCalendarComponent } from '../components/full-calendar/full-calendar.component';



@NgModule({
  declarations: [
    DashboardComponent,
    NewsComponent,
    DashboardStatComponent,
    FullCalendarComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
