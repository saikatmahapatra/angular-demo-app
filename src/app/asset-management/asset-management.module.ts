import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetManagementRoutingModule } from './asset-management-routing.module';
import { AssetManagementLayoutComponent } from './asset-management-layout.component';
import { AddEditAssetsComponent } from './add-edit-assets/add-edit-assets.component';
import { ManageAssetsComponent } from './manage-assets/manage-assets.component';
import { AssignAssetsComponent } from './assign-assets/assign-assets.component';
import { PrimeNgModule } from '../prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../@shared/shared.module';


@NgModule({
  declarations: [
    AssetManagementLayoutComponent,
    AddEditAssetsComponent,
    ManageAssetsComponent,
    AssignAssetsComponent
  ],
  imports: [
    CommonModule,
    AssetManagementRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule
  ]
})
export class AssetManagementModule { }
