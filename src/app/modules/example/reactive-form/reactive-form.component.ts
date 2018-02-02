import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../../services/content.service';
import { ValidationService } from '../../../services/validation.service';
import { CreditCustomer } from '../../../shared/class/user'; // Import the user class for form example
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
  providers: [ContentService, ValidationService]
})
export class ReactiveFormComponent implements OnInit {

  private genderList: string[];
  private user: CreditCustomer;
  constructor(private _contentService: ContentService, private _validator: ValidationService) { }

  ngOnInit() {
    this.genderList = ['Male','Female', 'Transgender'];
  }

}
