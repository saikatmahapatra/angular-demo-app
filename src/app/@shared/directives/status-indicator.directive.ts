import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[stausIndicator]'
})
export class StatusIndicatorDirective {

  @Input() name!: string;
  @Input() value!: string;
  @Input() theme!: string;

  constructor() { 
    console.log(this.name,  this.value, this.theme);

  }

}
