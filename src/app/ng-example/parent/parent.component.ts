import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  department = "Information Technology"; // pass from parent to child
  city = "KOLKATA"; // pass this to child component and covert it to lowercase
  userAgreed : boolean;
  constructor() { }

  ngOnInit() {
  }

  isAgreed($e){
    this.userAgreed = $e;
  }

}
