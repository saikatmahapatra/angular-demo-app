import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimesheetRoutingModule } from './timesheet-routing.module';
import { TimesheetLayoutComponent } from './timesheet-layout.component';
import { TimesheetFormComponent } from './timesheet-form/timesheet-form.component';
import { ManageTimesheetComponent } from './manage-timesheet/manage-timesheet.component';
import { ViewTimesheetComponent } from './view-timesheet/view-timesheet.component';
import { SharedModule } from '../@shared/shared.module';
import { PrimeNgModule } from '../prime-ng.module';
import { EditTimesheetComponent } from './edit-timesheet/edit-timesheet.component';
import { TimesheetReportComponent } from './timesheet-report/timesheet-report.component';
@NgModule({
  declarations: [
    TimesheetLayoutComponent,
    TimesheetFormComponent,
    ManageTimesheetComponent,
    ViewTimesheetComponent,
    EditTimesheetComponent,
    TimesheetReportComponent
  ],
  imports: [
    CommonModule,
    TimesheetRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule
  ]
})
export class TimesheetModule { }
