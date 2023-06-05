import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimesheetFormComponent } from './timesheet-form/timesheet-form.component';
import { TimesheetLayoutComponent } from './timesheet-layout.component';
import { EditTimesheetComponent } from './edit-timesheet/edit-timesheet.component';
import { TimesheetReportComponent } from './timesheet-report/timesheet-report.component';
import { AdminGuard } from '../@core/guards/admin.guard';
import { ViewTimesheetComponent } from './view-timesheet/view-timesheet.component';
const routes: Routes = [
  {
    path: '', component: TimesheetLayoutComponent, children: [
      { path: 'log-work', component: TimesheetFormComponent },
      { path: 'view-logged-work', component: ViewTimesheetComponent },
      { path: 'edit-timesheet/:id', component: EditTimesheetComponent },
      { path: 'report', canActivate: [AdminGuard], component: TimesheetReportComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesheetRoutingModule { }
