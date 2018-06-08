import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child-comp',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  private _city;
  userAgreed = false;
  clickedFromParent = 0; // parent interactes with child with local variable
  @Input() department: string;

  @Input()
  set mycity(city: string) {
    this._city = city ? city.toLowerCase() : 'no city';
  }
  get mycity(): string { return this._city; }

  constructor() { }

  ngOnInit() {
  }

  @Output() agreed = new EventEmitter<boolean>();

  IsUserAgreed(ag: boolean) {
    this.userAgreed = ag;
    this.agreed.emit(ag);
  }

  testMethod(){
    this.clickedFromParent++;
  }


}
