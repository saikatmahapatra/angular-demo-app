import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { QuickRoutingModule } from './quick-routing.module';
import {
  IndexComponent
} from './index';

@NgModule({
  imports: [
    CommonModule,
    QuickRoutingModule
  ],
  declarations: [IndexComponent]
})
export class QuickModule { }
