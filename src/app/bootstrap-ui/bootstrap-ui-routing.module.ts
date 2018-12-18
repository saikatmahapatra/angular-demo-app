import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BootstrapUiComponent } from './bootstrap-ui.component';

const router: Routes = [{
  path: '',
  component: BootstrapUiComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(router)
  ],
})

export class BootstrapUiRoutingModule { }
