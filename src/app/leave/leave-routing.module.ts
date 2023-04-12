import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { LeaveLayoutComponent } from './leave-layout.component';
import { ManageLeaveComponent } from './manage-leave/manage-leave.component';
import { AdminGuard } from '../@core/guards/admin.guard';
import { LeaveDetailsActionsComponent } from './leave-details-actions/leave-details-actions.component';
import { LeaveBalanceCalculationComponent } from './leave-balance-calculation/leave-balance-calculation.component';

const routes: Routes = [
  {path: '', component: LeaveLayoutComponent, children: [
    {path: '', component: ApplyLeaveComponent},
    {path: 'apply', component: ApplyLeaveComponent},
    {path: 'manage', canActivate: [AdminGuard], component: ManageLeaveComponent},
    {path: 'history', component: ManageLeaveComponent},
    {path: 'requests-to-approve', component: ManageLeaveComponent},
    {path: 'details/:id', component: LeaveDetailsActionsComponent},
    {path: 'history-details/:id', component: LeaveDetailsActionsComponent},
    {path: 'balance', component: LeaveBalanceCalculationComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveRoutingModule { }
