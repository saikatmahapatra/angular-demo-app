import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator } from '@angular/forms';
import { User } from '../../shared/models/user'; // Import the user class for form example


@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.css']
})
export class TemplateDrivenFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  /**
   * Template Driven Form
   */
  phoneTypes = [
    { "val": "-1", "txt": "-Select-" },
    { "val": "m", "txt": "Mobile" },
    { "val": "w", "txt": "Work" },
    { "val": "h", "txt": "Home" },
  ];
  isSubmitted = false;
  model = new User(1, 'Saikat', 'Mahapatra', 'mahapatra.saikat@gmail.com', '', '');
  onSubmit(event) {
    console.log(event);
    this.isSubmitted = true;
  }
  get diagonostic() {
    return JSON.stringify(this.model);
  }

}
