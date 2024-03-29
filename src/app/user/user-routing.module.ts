import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddEditBasicInfoComponent } from './add-edit-basic-info/add-edit-basic-info.component';
import { AddEditAddressComponent } from './add-edit-address/add-edit-address.component';
import { AddEditEducationComponent } from './add-edit-education/add-edit-education.component';
import { AddEditExperienceComponent } from './add-edit-experience/add-edit-experience.component';
import { AddEditEmergencyContactComponent } from './add-edit-emergency-contact/add-edit-emergency-contact.component';
import { UploadPhotoComponent } from './upload-photo/upload-photo.component';
import { UploadDocComponent } from './upload-doc/upload-doc.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddEditPayrollInfoComponent } from './add-edit-payroll-info/add-edit-payroll-info.component';
import { EditApproversComponent } from './edit-approvers/edit-approvers.component';
import { PeopleILeadComponent } from './people-i-lead/people-i-lead.component';
import { ViewEmployeesComponent } from './view-employees/view-employees.component';
import { AdminGuard } from '../@core/guards/admin.guard';
import { ViewMyProfileComponent } from './view-my-profile/view-my-profile.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  {
    path: '', component: UserComponent,
    children: [
      { path: '', component: ViewMyProfileComponent },
      { path: 'my-profile', component: ViewMyProfileComponent },
      { path: 'view-emp-profile/:id', component: ViewProfileComponent, canActivate: [AdminGuard] },
      { path: 'edit/:id', component: EditUserComponent, canActivate: [AdminGuard] },
      { path: 'add', canActivate: [AdminGuard], component: AddUserComponent },
      { path: 'manage', canActivate: [AdminGuard], component: ManageUsersComponent },
      { path: 'edit/:id', canActivate: [AdminGuard], component: ManageUsersComponent },
      { path: 'edit-basic-info', component: AddEditBasicInfoComponent },
      { path: 'add-address', component: AddEditAddressComponent },
      { path: 'edit-address/:id', component: AddEditAddressComponent },
      { path: 'add-education', component: AddEditEducationComponent },
      { path: 'edit-education/:id', component: AddEditEducationComponent },
      { path: 'add-work-experience', component: AddEditExperienceComponent },
      { path: 'edit-work-experience/:id', component: AddEditExperienceComponent },
      { path: 'add-payroll-info', component: AddEditPayrollInfoComponent },
      { path: 'edit-payroll-info/:id', component: AddEditPayrollInfoComponent },
      { path: 'add-emergency-contact', component: AddEditEmergencyContactComponent },
      { path: 'edit-emergency-contact/:id', component: AddEditEmergencyContactComponent },
      { path: 'upload-profile-photo', component: UploadPhotoComponent },
      { path: 'upload-documents', component: UploadDocComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'change-approvers', component: EditApproversComponent },
      { path: 'view-employees', component: ViewEmployeesComponent },
      { path: 'view-reportees', component: PeopleILeadComponent }
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
})
export class UserRoutingModule { }
