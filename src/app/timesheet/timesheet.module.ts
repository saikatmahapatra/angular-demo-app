import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimesheetRoutingModule } from './timesheet-routing.module';
import { TimesheetLayoutComponent } from './timesheet-layout.component';
import { TimesheetFormComponent } from './timesheet-form/timesheet-form.component';
import { ManageTimesheetComponent } from './manage-timesheet/manage-timesheet.component';
import { ViewTimesheetComponent } from './view-timesheet/view-timesheet.component';
import { SharedModule } from '../@shared/shared.module';
@NgModule({
  declarations: [
    TimesheetLayoutComponent,
    TimesheetFormComponent,
    ManageTimesheetComponent,
    ViewTimesheetComponent
  ],
  imports: [
    CommonModule,
    TimesheetRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TimesheetModule { }
