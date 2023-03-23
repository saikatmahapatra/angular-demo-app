import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';

const data = [
  CalendarModule
];

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    ...data
  ],
  exports: [
    ...data
  ]
})
export class PrimengModule { }
