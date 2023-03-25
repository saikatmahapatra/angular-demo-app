import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveRoutingModule } from './leave-routing.module';
import { LeaveLayoutComponent } from './leave-layout.component';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { ManageLeaveComponent } from './manage-leave/manage-leave.component';
import { ViewLeaveHistoryComponent } from './view-leave-history/view-leave-history.component';
import { PrimeNgModule } from '../prime-ng.module';
import { SharedModule } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LeaveLayoutComponent,
    ApplyLeaveComponent,
    ManageLeaveComponent,
    ViewLeaveHistoryComponent    
  ],
  imports: [
    CommonModule,
    LeaveRoutingModule,
    SharedModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LeaveModule { }