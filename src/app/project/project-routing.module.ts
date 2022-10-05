import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddEditProjectComponent } from './add-edit-project/add-edit-project.component';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';
import { ProjectLayoutComponent } from './project-layout.component';

const routes: Routes = [
  {
    path: '', component: ProjectLayoutComponent, children: [
      { path: '', component: ProjectLayoutComponent },
      { path: 'add-project', component: AddEditProjectComponent },
      { path: 'add-task', component: AddEditTaskComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
