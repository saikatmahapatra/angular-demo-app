import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {
  
  constructor(private el: ElementRef) { 
    this.el.nativeElement.style.backgroundColor='#f2f2f2';
  }

  highlight(color:string,txtColor:string){
    this.el.nativeElement.style.backgroundColor = color;
    //this.el.nativeElement.style.color = txtColor;
  }

  @HostListener('mouseenter') onmouseenter(){
    this.highlight('#a0d875','#fff');   
  }  

  @HostListener('mouseleave') onmouseleave(){
   this.highlight('#e2b9b9','#fff');   
  }
}
