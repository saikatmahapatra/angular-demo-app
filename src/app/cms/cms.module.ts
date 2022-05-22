import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsRoutingModule } from './cms-routing.module';
import { CmsLayoutComponent } from './cms-layout.component';
import { ManageCmsComponent } from './manage-cms/manage-cms.component';
import { AddContentComponent } from './add-content/add-content.component';


@NgModule({
  declarations: [
    CmsLayoutComponent,
    ManageCmsComponent,
    AddContentComponent
  ],
  imports: [
    CommonModule,
    CmsRoutingModule
  ]
})
export class CmsModule { }
