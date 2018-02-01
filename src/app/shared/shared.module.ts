import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HighlightDirective } from './directives/highlight.directive';
import { ExponentialStrengthPipe } from './pipes/exponential-strength.pipe';
import { MaskPipe } from './pipes/mask.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
//import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  declarations: [
    HighlightDirective,
    ExponentialStrengthPipe,
    MaskPipe,
    OrderByPipe,
    //PageNotFoundComponent,
  ],
  exports: [
    HighlightDirective,
    ExponentialStrengthPipe,
    MaskPipe,
    OrderByPipe,
    //FormsModule,
    //HttpModule,
    //ReactiveFormsModule
  ]
})
export class SharedModule { }
