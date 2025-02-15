import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CommonService } from '../../@core/services/common.service';
@Component({
    selector: 'app-pipes',
    templateUrl: './pipes.component.html',
    providers: [CommonService],
    standalone: false
})
export class PipesComponent implements OnInit {

  birthday = new Date(1988, 3, 15);
  name = 'Saikat Mahapatra';
  productPrice = 1999.3;
  homeLoan = 7;
  constructor(private commonSvc: CommonService) { }


  /**
   * Order By
   */
  order: string = 'name'; //default orderby key name of a collection
  reverse: boolean = false;
  //Collection - It can be returned by any service
  students: any[] = [
    { id: 1, name: 'Saikat', mobile: '1234567890', age: 30 },
    { id: 5, name: 'Suman', mobile: '7003700300', age: 12 },
    { id: 2, name: 'Mike', mobile: '99802545454', age: 21 },
    { id: 3, name: 'Julie', mobile: '7001202313', age: 29 },
    { id: 4, name: 'Adam', mobile: '9830098310', age: 35 },
  ];

  //On clicking table header make it order
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

}
