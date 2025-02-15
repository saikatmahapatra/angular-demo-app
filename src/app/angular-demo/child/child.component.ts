import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrdersService } from '../parent/orders.service';
@Component({
    selector: 'app-child-comp',
    templateUrl: './child.component.html',
    providers: [OrdersService],
    standalone: false
})
export class ChildComponent implements OnInit {
  @Input()
  set mycolor(str) {
    this.colorToDisplay = str ? str : 'no color';
  }
  get mycolor(): any {return this.colorToDisplay; }

  @Input()
  set mycity(city: string) {
    this.city = city ? city.toLowerCase() : 'no city';
  }
  get mycity(): string { return this.city; }

  private city: any;
  userAgreed = false;
  clickedFromParent = 0; // parent interactes with child with local variable
  name = 'Saikat';
  result: any;
  @Input() department: any;
  totalAddedToCart: any;
  colorToDisplay: any; // for using in setter, using getter, setter for showing default val
  @Output() agreed = new EventEmitter<boolean>();

  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.result = this.childMethod(this.name);
    this.ordersService.totalAddedQtyToDisplay$.subscribe(data => {
      console.log('child comp', data);
      this.totalAddedToCart = data;
    });
  }

  IsUserAgreed(isAgree: boolean) {
    this.userAgreed = isAgree;
    this.agreed.emit(isAgree);
  }

  testMethod() {
    this.clickedFromParent++;
  }

  childMethod(name: any) {
    return 'childMethod() called. My name is ' + name;
  }


}
