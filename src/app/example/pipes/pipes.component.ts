import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-pipes',
  templateUrl: './pipes.component.html',
  styleUrls: ['./pipes.component.css']
})
export class PipesComponent implements OnInit {
  
  birthday = new Date(1988, 3, 15);
  name = 'Saikat Mahapatra';
  productPrice = 1999.3;
  homeLoan = 7;
  constructor() { }

  ngOnInit() {
    console.log('ngOnInit');
  }

}
