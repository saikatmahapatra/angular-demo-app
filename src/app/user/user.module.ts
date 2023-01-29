import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../@shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AuthInterceptor } from '../@core/interceptors/auth.interceptor';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UploadPhotoComponent } from './upload-photo/upload-photo.component';
import { UploadDocComponent } from './upload-doc/upload-doc.component';
import { AddEditAddressComponent } from './add-edit-address/add-edit-address.component';
import { AddEditEducationComponent } from './add-edit-education/add-edit-education.component';
import { AddEditExperienceComponent } from './add-edit-experience/add-edit-experience.component';
import { AddEditEmergencyContactComponent } from './add-edit-emergency-contact/add-edit-emergency-contact.component';
import { AddEditBasicInfoComponent } from './add-edit-basic-info/add-edit-basic-info.component';
import { AddEditPayrollInfoComponent } from './add-edit-payroll-info/add-edit-payroll-info.component';
import { EditApproversComponent } from './edit-approvers/edit-approvers.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    UserRoutingModule
  ],
  declarations: [
    ManageUsersComponent,
    UserComponent,
    AddUserComponent,
    ViewProfileComponent,
    ChangePasswordComponent,
    UploadPhotoComponent,
    UploadDocComponent,
    AddEditAddressComponent,
    AddEditEducationComponent,
    AddEditExperienceComponent,
    AddEditEmergencyContactComponent,
    AddEditBasicInfoComponent,
    AddEditPayrollInfoComponent,
    EditApproversComponent
  ]
})
export class UserModule { }
