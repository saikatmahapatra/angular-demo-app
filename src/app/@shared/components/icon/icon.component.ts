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
  @Input() svg: boolean | undefined;

  constructor() {
    this.lib = this.lib ? this.lib : 'bootstrap-icon';
    this.name = this.name ? this.name : 'info';
    this.width = this.width ? this.width : 16; // for svg
    this.height = this.height ? this.height : 16; // for svg
    this.fill = this.fill ? this.fill : 'currentColor'; // for svg
    this.styleCSS = this.styleCSS ? this.styleCSS: '';
    this.svg = this.svg ? this.svg: false;
  }

  ngOnInit(): void {
  }

}
