import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator } from '@angular/forms';
import { User } from '../../../shared/class/user'; // Import the user class for form example
import { ContentService } from '../../../services/content.service';

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.css'],
  providers: [ContentService]
})
export class TemplateDrivenFormComponent implements OnInit {

  constructor(private _contentService: ContentService) { }

  ngOnInit() {
  }

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
