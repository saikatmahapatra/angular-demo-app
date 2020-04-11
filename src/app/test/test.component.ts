import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent-comp-test',
  templateUrl: './test.component.html'
})
export class TestComponent implements OnInit {
  department = "Information Technology"; // pass from parent to child
  city = "KOLKATA"; // pass this to child component and covert it to lowercase
  constructor() { }

  ngOnInit() {
  }

}
