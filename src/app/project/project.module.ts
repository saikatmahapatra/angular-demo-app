import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProjectRoutingModule } from './project-routing.module';
import { AddEditProjectComponent } from './add-edit-project/add-edit-project.component';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';
import { ProjectLayoutComponent } from './project-layout.component';
import { SharedModule } from '../@shared/shared.module';
import { ManageProjectComponent } from './manage-project/manage-project.component';
import { ManageTaskComponent } from './manage-task/manage-task.component';
import { PrimeNgModule } from '../prime-ng.module';
import { DataVisualizationComponent } from './data-visualization/data-visualization.component';


@NgModule({
  declarations: [
    AddEditProjectComponent,
    AddEditTaskComponent,
    ProjectLayoutComponent,
    ManageProjectComponent,
    ManageTaskComponent,
    DataVisualizationComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PrimeNgModule
  ]
})
export class ProjectModule { }
