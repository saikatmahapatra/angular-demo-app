import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ErrorComponent }
    ])
  ],
  declarations: [ErrorComponent]
})
export class ErrorModule { }
