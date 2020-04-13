import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ChildComponent } from '../child/child.component';
import { OrdersService } from './orders.service';
@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  providers: [OrdersService]
})
export class ParentComponent implements OnInit {
  department = 'Information Technology 344'; // pass from parent to child
  city = 'KOLKATA'; // pass this to child component and covert it to lowercase
  userAgreed: boolean;
  @ViewChild(ChildComponent) private child1: ChildComponent;
  name = 'John';
  result = '';
  orders: any;
  constructor(private orderService: OrdersService) { }

  ngOnInit() {
    this.name += this.child1.name; // reading child's variable
    this.result = this.child1.childMethod(this.name); // reading child's method
    this.orders = this.orderService.gerOrders();
  }

  isAgreed($e) {
    this.userAgreed = $e;
  }

}
