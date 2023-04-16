import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CmsLayoutComponent } from './cms-layout.component';
import { ManageCmsComponent } from './manage-cms/manage-cms.component';
import { AddContentComponent } from './add-content/add-content.component';
import { ViewHolidaysComponent } from './view-holidays/view-holidays.component';
import { ManageHolidaysComponent } from './manage-holidays/manage-holidays.component';
import { AdminGuard } from '../@core/guards/admin.guard';
const routes: Routes = [
  {
    path: '', component: CmsLayoutComponent, children: [
      { path: 'manage-cms', canActivate: [AdminGuard], component: ManageCmsComponent },
      { path: 'add', canActivate: [AdminGuard], component: AddContentComponent },
      { path: 'edit/:id', canActivate: [AdminGuard], component: AddContentComponent },
      { path: 'holiday-calendar', component: ViewHolidaysComponent },
      { path: 'holiday-management', canActivate: [AdminGuard], component: ManageHolidaysComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
