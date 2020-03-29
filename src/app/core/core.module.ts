import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './component/core.component';

import { PagenotfoundComponent } from '../pagenotfound/pagenotfound.component';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  declarations: [CoreComponent, PagenotfoundComponent],
  exports: [CoreComponent, PagenotfoundComponent]
})
export class CoreModule { }
