import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-child-comp-student',
  templateUrl: './student.component.html'
})
export class StudentComponent implements OnInit {
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
