import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import {
  TestComponent,
  StudentComponent
} from './index';

@NgModule({
  imports: [
    CommonModule,
    TestRoutingModule
  ],
  declarations: [TestComponent, StudentComponent]
})
export class TestModule { }
