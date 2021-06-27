import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HospitalManagementRoutingModule } from './hospital-management-routing.module';
import { HospitalViewComponent } from './hospital-view/hospital-view.component';
import { DepartmentViewComponent } from './department-view/department-view.component';
import { SortDirective } from './directive/sort.directive';
import { HospitalMgmtComponent } from './hospital-mgmt.component';

@NgModule({
  declarations: [
    HospitalViewComponent,
    DepartmentViewComponent,
    SortDirective,
    HospitalMgmtComponent
  ],
  imports: [
    CommonModule,
    HospitalManagementRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class HospitalManagementModule { }
