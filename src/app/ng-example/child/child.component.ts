import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrdersService } from '../parent/orders.service';
@Component({
  selector: 'app-child-comp',
  templateUrl: './child.component.html',
  providers: [OrdersService]
})
export class ChildComponent implements OnInit {
  private city;
  userAgreed = false;
  clickedFromParent = 0; // parent interactes with child with local variable
  name = 'Saikat';
  result: string;
  orders: any;
  @Input() department: string;

  @Input()
  set mycity(city: string) {
    this.city = city ? city.toLowerCase() : 'no city';
  }
  get mycity(): string { return this.city; }

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.result = this.childMethod(this.name);
    this.orders = this.ordersService.gerOrders();
  }

  @Output() agreed = new EventEmitter<boolean>();

  IsUserAgreed(ag: boolean) {
    this.userAgreed = ag;
    this.agreed.emit(ag);
  }

  testMethod() {
    this.clickedFromParent++;
  }

  childMethod(name) {
    return "childMethod() called. My name is " + name;
  }


}
