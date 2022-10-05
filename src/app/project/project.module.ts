import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { AddEditProjectComponent } from './add-edit-project/add-edit-project.component';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';
import { ProjectLayoutComponent } from './project-layout.component';


@NgModule({
  declarations: [
    AddEditProjectComponent,
    AddEditTaskComponent,
    ProjectLayoutComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule
  ]
})
export class ProjectModule { }
