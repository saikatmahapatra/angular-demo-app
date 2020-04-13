import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './component/core.component';

import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  declarations: [CoreComponent, PageNotFoundComponent],
  exports: [CoreComponent, PageNotFoundComponent]
})
export class CoreModule { }
