import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveRoutingModule } from './leave-routing.module';
import { LeaveLayoutComponent } from './leave-layout.component';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { ManageLeaveComponent } from './manage-leave/manage-leave.component';
import { ViewLeaveListoryComponent } from './view-leave-listory/view-leave-listory.component';


@NgModule({
  declarations: [
    LeaveLayoutComponent,
    ApplyLeaveComponent,
    ManageLeaveComponent,
    ViewLeaveListoryComponent
  ],
  imports: [
    CommonModule,
    LeaveRoutingModule
  ]
})
export class LeaveModule { }
