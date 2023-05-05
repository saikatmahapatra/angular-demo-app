import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetManagementRoutingModule } from './asset-management-routing.module';
import { AssetManagementLayoutComponent } from './asset-management-layout.component';
import { AddEditAssetsComponent } from './add-edit-assets/add-edit-assets.component';
import { ManageAssetsComponent } from './manage-assets/manage-assets.component';
import { AssignAssetsComponent } from './assign-assets/assign-assets.component';


@NgModule({
  declarations: [
    AssetManagementLayoutComponent,
    AddEditAssetsComponent,
    ManageAssetsComponent,
    AssignAssetsComponent
  ],
  imports: [
    CommonModule,
    AssetManagementRoutingModule
  ]
})
export class AssetManagementModule { }
