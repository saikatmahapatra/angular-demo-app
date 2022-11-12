import { Directive, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[stausIndicator]'
})
export class StatusIndicatorDirective {

  @Input() name!: string;
  @Input() value!: string;
  @Input() theme!: string;

  constructor(private el: ElementRef) {}

  @HostListener('window:load') onPageLoad(){
    this.displayStatus(this.name,  this.value, this.theme);  
  }

  displayStatus(name: string, val: string, theme: string) {
    let text = val;
    let textColor = '';
    if(name === 'status') {
      text = val === 'Y' ? 'Active' : 'Inactive';
    }
    if(theme === 'color') {
      textColor = val === 'Y' ? 'green' : 'red';
    }
    this.el.nativeElement.innerHTML = text;
    this.el.nativeElement.style.color = textColor;
  }

}
