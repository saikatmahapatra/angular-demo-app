import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-child-comp',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  private _city;
  @Input() department: string;

  @Input()
  set mycity(city: string) {
    this._city = city ? city.toLowerCase() : 'no city';
  }
  get mycity(): string { return this._city; }
  constructor() { }

  ngOnInit() {
  }

}
