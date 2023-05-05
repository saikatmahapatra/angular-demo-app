import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetManagementLayoutComponent } from './asset-management-layout.component';
import { ManageAssetsComponent } from './manage-assets/manage-assets.component';
import { AdminGuard } from '../@core/guards/admin.guard';
import { AddEditAssetsComponent } from './add-edit-assets/add-edit-assets.component';
import { AssignAssetsComponent } from './assign-assets/assign-assets.component';

const routes: Routes = [
  {
    path: '', component: AssetManagementLayoutComponent,
    children: [
      { path: '', canActivate: [AdminGuard], component: ManageAssetsComponent },
      { path: 'add', canActivate: [AdminGuard], component: AddEditAssetsComponent },
      { path: 'edit/:id', canActivate: [AdminGuard], component: AddEditAssetsComponent},
      { path: 'assign', canActivate: [AdminGuard], component: AssignAssetsComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetManagementRoutingModule { }
