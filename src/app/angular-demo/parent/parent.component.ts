import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ChildComponent } from '../child/child.component';
import { OrdersService } from './orders.service';
@Component({
    selector: 'app-parent',
    templateUrl: './parent.component.html',
    providers: [OrdersService],
    standalone: false
})
export class ParentComponent implements OnInit {
  department = 'Information Technology 344'; // pass from parent to child
  city = 'KOLKATA'; // pass this to child component and covert it to lowercase
  colorName: any = ''; // pass to child
  userAgreed: boolean = false;
  @ViewChild(ChildComponent)
  private child1!: ChildComponent;
  name = 'John';
  result = '';
  cartQty = 0;
  
  constructor(private orderService: OrdersService) { }

  ngOnInit() {
    this.name += this.child1.name; // reading child's variable
    this.result = this.child1.childMethod(this.name); // reading child's method
  }

  isAgreed(e: any) {
    this.userAgreed = e;
  }

  addToCart() {
    this.cartQty++;
    this.orderService.notifyAddToCart(this.cartQty);
  }

}
