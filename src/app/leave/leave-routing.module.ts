import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { LeaveLayoutComponent } from './leave-layout.component';
import { ManageLeaveComponent } from './manage-leave/manage-leave.component';
import { ViewLeaveHistoryComponent } from './view-leave-history/view-leave-history.component';
import { AdminGuard } from '../@core/guards/admin.guard';
import { LeaveDetailsActionsComponent } from './leave-details-actions/leave-details-actions.component';

const routes: Routes = [
  {path: '', component: LeaveLayoutComponent, children: [
    {path: '', component: ApplyLeaveComponent},
    {path: 'apply', component: ApplyLeaveComponent},
    {path: 'manage', canActivate: [AdminGuard], component: ManageLeaveComponent},
    {path: 'history', component: ViewLeaveHistoryComponent},
    {path: 'details/:id', component: LeaveDetailsActionsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveRoutingModule { }
