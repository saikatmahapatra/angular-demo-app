import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input() lib: string | undefined;
  @Input() name: string | undefined;
  @Input() width: number | undefined;
  @Input() height: number | undefined;
  @Input() fill: string | undefined;
  @Input() styleCSS: any | undefined;


  constructor() {
    this.lib = this.lib ? this.lib : 'bootstrap-icon';
    this.name = this.name ? this.name : 'info';
    this.width = this.width ? this.width : 18;
    this.height = this.height ? this.height : 18;
    this.fill = this.fill ? this.fill : 'currentColor';
    this.styleCSS = this.styleCSS ? this.styleCSS: '';
  }

  ngOnInit(): void {
  }

}
