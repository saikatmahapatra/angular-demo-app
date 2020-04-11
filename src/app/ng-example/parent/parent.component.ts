import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ChildComponent } from '../child/child.component';
import { OrdersService } from './orders.service';
@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  providers: [OrdersService]
})
export class ParentComponent implements OnInit {
  department = "Information Technology 344"; // pass from parent to child
  city = "KOLKATA"; // pass this to child component and covert it to lowercase
  userAgreed: boolean;
  @ViewChild(ChildComponent) private _child_1: ChildComponent;
  name = "John";
  result = "";
  orders: any;
  constructor(private _oredsrService: OrdersService) { }

  ngOnInit() {
    this.name += this._child_1.name; // reading child's variable
    this.result = this._child_1.childMethod(this.name); // reading child's method
    this.orders = this._oredsrService.gerOrders();
  }

  isAgreed($e) {
    this.userAgreed = $e;
  }

}
