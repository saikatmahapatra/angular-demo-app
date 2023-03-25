import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimesheetFormComponent } from './timesheet-form/timesheet-form.component';
import { ManageTimesheetComponent } from './manage-timesheet/manage-timesheet.component';
import { ViewTimesheetComponent } from './view-timesheet/view-timesheet.component';
import { TimesheetLayoutComponent } from './timesheet-layout.component';
import { EditTimesheetComponent } from './edit-timesheet/edit-timesheet.component';
const routes: Routes = [
  {
    path: '', component: TimesheetLayoutComponent, children: [
      { path: '', component: TimesheetFormComponent },
      { path: 'manage', component: ManageTimesheetComponent },
      { path: 'edit-timesheet/:id', component: EditTimesheetComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesheetRoutingModule { }
