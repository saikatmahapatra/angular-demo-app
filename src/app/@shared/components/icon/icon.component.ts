import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input() lib: string = 'png';
  @Input() name: string = '';
  @Input() width: number = 16;
  @Input() height: number = 16;
  @Input() fill: string = 'currentColor';
  @Input() styleCSS: any = '';
  @Input() svg: boolean =  false;

  //primeng 
  primeNGIcon: any = {
    'user' :'pi pi-user'
  }

  bootstrapIcon: any = {
    'user' :'bi bi-person-fill'
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  getIconClass() {
    if(this.lib == 'png') {
      return this.primeNGIcon[this.name] ? this.primeNGIcon[this.name] : 'pi pi-question';
    }
    if(this.lib == 'bs5') {
      return this.bootstrapIcon[this.name] ? this.bootstrapIcon[this.name] : 'bi bi-info-circle';
    }
  }

}
