import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TwitterbootstrapRoutingModule } from './twitterbootstrap-routing.module';
import {
  IndexComponent
} from './index';

@NgModule({
  imports: [
    CommonModule,
    TwitterbootstrapRoutingModule
  ],
  declarations: [IndexComponent]
})
export class TwitterbootstrapModule { }
