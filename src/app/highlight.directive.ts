import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {
  
  constructor(private el: ElementRef) { 
    this.el.nativeElement.style.backgroundColor='';
  }

  highlight(color:string,txtColor:string){
    this.el.nativeElement.style.backgroundColor = color;
    this.el.nativeElement.style.color = txtColor;
  }

  @HostListener('mouseenter') onmouseenter(){
    this.highlight('green','#fff');   
  }  

  @HostListener('mouseleave') onmouseleave(){
   this.highlight('red','#fff');   
  }
}
