import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimesheetFormComponent } from './timesheet-form/timesheet-form.component';
import { ManageTimesheetComponent } from './manage-timesheet/manage-timesheet.component';
import { TimesheetLayoutComponent } from './timesheet-layout.component';
import { EditTimesheetComponent } from './edit-timesheet/edit-timesheet.component';
import { TimesheetReportComponent } from './timesheet-report/timesheet-report.component';
import { AdminGuard } from '../@core/guards/admin.guard';
const routes: Routes = [
  {
    path: '', component: TimesheetLayoutComponent, children: [
      { path: 'log-work', component: TimesheetFormComponent },
      { path: 'manage', canActivate: [AdminGuard], component: ManageTimesheetComponent },
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
