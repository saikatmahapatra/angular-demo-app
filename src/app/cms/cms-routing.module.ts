import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CmsLayoutComponent } from './cms-layout.component';
import { ManageCmsComponent } from './manage-cms/manage-cms.component';
import { AddContentComponent } from './add-content/add-content.component';
import { ViewHolidaysComponent } from './view-holidays/view-holidays.component';
const routes: Routes = [
  {
    path: '', component: CmsLayoutComponent, children: [
      { path: '', component: ManageCmsComponent },
      { path: 'add', component: AddContentComponent },
      { path: 'edit/:id', component: AddContentComponent },
      { path: 'holiday-calendar', component: ViewHolidaysComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
