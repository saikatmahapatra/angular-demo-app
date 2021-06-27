import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HospitalViewComponent } from './hospital-view/hospital-view.component';
import { DepartmentViewComponent } from './department-view/department-view.component';
import { HospitalMgmtComponent } from './hospital-mgmt.component';
const routes: Routes = [
  {
    path: '', component: HospitalMgmtComponent,
    children: [
      { path: '', component: HospitalViewComponent },
      { path: 'hospital', component: HospitalViewComponent },
      { path: 'department', component: DepartmentViewComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalManagementRoutingModule { }
