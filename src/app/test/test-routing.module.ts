import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test.component'
import { StudentComponent } from './student/student.component'
const routes: Routes = [
  { path: '', component: TestComponent },
  { path: 'student', component: StudentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
