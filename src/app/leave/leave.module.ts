import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveRoutingModule } from './leave-routing.module';
import { LeaveLayoutComponent } from './leave-layout.component';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { ManageLeaveComponent } from './manage-leave/manage-leave.component';
import { PrimeNgModule } from '../prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeaveDetailsActionsComponent } from './leave-details-actions/leave-details-actions.component';
import { SharedModule } from '../@shared/shared.module';
import { LeaveBalanceCalculationComponent } from './leave-balance-calculation/leave-balance-calculation.component';


@NgModule({
  declarations: [
    LeaveLayoutComponent,
    ApplyLeaveComponent,
    ManageLeaveComponent,
    LeaveDetailsActionsComponent,
    LeaveBalanceCalculationComponent    
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
