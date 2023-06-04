import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KoreAiComponent } from './kore-ai.component';
const routes: Routes = [{
  path: '',
  component: KoreAiComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KoreAiRoutingModule { }
