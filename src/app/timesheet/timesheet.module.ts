import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimesheetRoutingModule } from './timesheet-routing.module';
import { TimesheetLayoutComponent } from './timesheet-layout.component';
import { TimesheetFormComponent } from './timesheet-form/timesheet-form.component';
import { ManageTimesheetComponent } from './manage-timesheet/manage-timesheet.component';
import { ViewTimesheetComponent } from './view-timesheet/view-timesheet.component';
import { SharedModule } from '../@shared/shared.module';
import { MaterialModule } from '../material.module';
import { ViewTimesheetGridComponent } from './view-timesheet-grid/view-timesheet-grid.component';
@NgModule({
  declarations: [
    TimesheetLayoutComponent,
    TimesheetFormComponent,
    ManageTimesheetComponent,
    ViewTimesheetComponent,
    ViewTimesheetGridComponent
  ],
  imports: [
    CommonModule,
    TimesheetRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class TimesheetModule { }
