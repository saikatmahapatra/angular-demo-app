import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddEditBasicInfoComponent } from './add-edit-basic-info/add-edit-basic-info.component';
import { AddEditAddressComponent } from './add-edit-address/add-edit-address.component';
import { AddEditEducationComponent } from './add-edit-education/add-edit-education.component';
import { AddEditExperienceComponent } from './add-edit-experience/add-edit-experience.component';
import { AddEditBankInfoComponent } from './add-edit-bank-info/add-edit-bank-info.component';
import { AddEditEmergencyContactComponent } from './add-edit-emergency-contact/add-edit-emergency-contact.component';
import { UploadPhotoComponent } from './upload-photo/upload-photo.component';
import { UploadDocComponent } from './upload-doc/upload-doc.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';

const routes: Routes = [
  {
    path: '', component: UserComponent,
    children: [
      { path: '', component: ViewProfileComponent },
      { path: 'my-profile', component: ViewProfileComponent },
      { path: 'view-profile/:id', component: ViewProfileComponent },
      { path: 'add', component: AddUserComponent },
      { path: 'edit-basic-info', component: AddEditBasicInfoComponent },
      { path: 'add-address', component: AddEditAddressComponent },
      { path: 'edit-address/:id', component: AddEditAddressComponent },
      { path: 'add-education', component: AddEditEducationComponent },
      { path: 'edit-education/:id', component: AddEditEducationComponent },
      { path: 'add-work-experience', component: AddEditExperienceComponent },
      { path: 'edit-work-experience/:id', component: AddEditExperienceComponent },
      { path: 'add-bank-info', component: AddEditBankInfoComponent },
      { path: 'edit-bank-info/:id', component: AddEditBankInfoComponent },
      { path: 'add-emergency-contact', component: AddEditEmergencyContactComponent },
      { path: 'edit-emergency-contact/:id', component: AddEditEmergencyContactComponent },
      { path: 'upload-profile-photo', component: UploadPhotoComponent },
      { path: 'upload-documents', component: UploadDocComponent },
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
})
export class UserRoutingModule { }
