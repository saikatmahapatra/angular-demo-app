import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CmsRoutingModule } from './cms-routing.module';
import { CmsLayoutComponent } from './cms-layout.component';
import { ManageCmsComponent } from './manage-cms/manage-cms.component';
import { AddContentComponent } from './add-content/add-content.component';
import { ViewHolidaysComponent } from './view-holidays/view-holidays.component';
import { ViewHrPoliciesComponent } from './view-hr-policies/view-hr-policies.component';
import { PrimeNgModule } from '../prime-ng.module';
import { ManageHolidaysComponent } from './manage-holidays/manage-holidays.component';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  imports: [
    CommonModule,
    CmsRoutingModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    EditorModule
  ],
  declarations: [
    CmsLayoutComponent,
    ManageCmsComponent,
    AddContentComponent,
    ViewHolidaysComponent,
    ViewHrPoliciesComponent,
    ManageHolidaysComponent
  ]
})
export class CmsModule { }
