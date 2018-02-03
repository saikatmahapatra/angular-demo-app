import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../../services/content.service';
import { ValidationService } from '../../../services/validation.service';
import { CreditCustomer } from '../../../shared/class/user'; // Import the user class for form example
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
  providers: [ContentService, ValidationService]
})
export class ReactiveFormComponent implements OnInit {

  private genderList: any[];
  private user: CreditCustomer;
  signupForm: FormGroup;
  constructor(private _contentService: ContentService, private _validator: ValidationService) { }

  ngOnInit() {
    //this.genderList = ['Male', 'Female', 'Transgender'];
    this.genderList = this._contentService.getGenders();
    this.signupForm = new FormGroup({
      email: new FormControl('', Validators.required),
      createPassword: new FormGroup({
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required)
      }),
      gender: new FormControl('', Validators.required),
      terms: new FormControl(false, Validators.required)
    });
  }

  onFormSubmit() {
    if(this.signupForm.valid){
      console.log("Sign Up Form Validated");
      this.user = this.signupForm.value;
      console.log(this.user);
    }
  }

}
