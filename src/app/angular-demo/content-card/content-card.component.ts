import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-content-card',
    templateUrl: './content-card.component.html',
    styleUrls: ['./content-card.component.scss'],
    standalone: false
})
export class ContentCardComponent implements OnInit {

  @Input() message: any;

  users = [
    {name: 'Saikat', age: 35},
    {name: 'John', age: 34},
    {name: 'Ram', age: 23},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
