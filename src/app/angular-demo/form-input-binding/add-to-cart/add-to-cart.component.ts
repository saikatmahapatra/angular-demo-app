import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-add-to-cart',
    templateUrl: './add-to-cart.component.html',
    styleUrls: ['./add-to-cart.component.scss'],
    standalone: false
})
export class AddToCartComponent implements OnInit {

  @Input()
  qty!: number;
  @Output() qtyChange = new EventEmitter<number>();


  constructor() {
  }

  ngOnInit() {
  }

  decQty() {
    if (this.qty > 1) {
      this.qty = this.qty - 1;
    } else {
      this.qty = 1;
    }
    this.qtyChange.emit(this.qty);
  }

  incQty() {
    if (this.qty < 5) {
      this.qty += 1;
    }
    this.qtyChange.emit(this.qty);
  }

}
