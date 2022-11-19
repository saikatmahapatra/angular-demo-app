import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddEditProjectComponent } from './add-edit-project/add-edit-project.component';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';
import { ManageProjectComponent } from './manage-project/manage-project.component';
import { ManageTaskComponent } from './manage-task/manage-task.component';
import { ProjectLayoutComponent } from './project-layout.component';

const routes: Routes = [
  {
    path: '', component: ProjectLayoutComponent, children: [
      { path: '', component: ManageProjectComponent },
      { path: 'add-project', component: AddEditProjectComponent },
      { path: 'edit-project/:id', component: AddEditProjectComponent },
      { path: 'add-task', component: AddEditTaskComponent },
      { path: 'edit-task/:id', component: AddEditTaskComponent },
      { path: 'manage-tasks', component: ManageTaskComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
