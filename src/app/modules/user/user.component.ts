import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})

export class UserComponent implements OnInit {
  public saveUserForm: FormGroup;
  public submitted: boolean;
  public events: any[] = [];
  public userList:any = [];
  public postData = {};

  constructor(private _userService: UserService, public formBuilder: FormBuilder) {

  }

  ngOnInit() {
    //this.userList = this._userService.getUsers();

    this._userService.getUsers().subscribe(
      data => {
        this.userList = data;
      }
    );

    /*To add a validator, we must first convert the string value into an array.
    The first item in the array is the default value if any, 
    then the next item in the array is the validator.
    Here we are adding a required validator meaning that the 
    name attribute must have a value in it.*/
    this.saveUserForm = this.formBuilder.group({
      name: [
        '',
        Validators.compose([
          <any>Validators.required,
          <any>Validators.minLength(5),
          <any>Validators.maxLength(10)
        ])
      ],
      email: [
        '',
        Validators.compose([
          <any>Validators.required,
          <any>this.isInvalidEmail
        ])
      ]
    });

    // subscribe to form changes
    this.subcribeToFormChanges();
  }

  showDetails() {
    alert("Show Details");
  }

  subcribeToFormChanges() {
    const myFormStatusChanges$ = this.saveUserForm.statusChanges;
    const myFormValueChanges$ = this.saveUserForm.valueChanges;

    myFormStatusChanges$.subscribe(x => this.events.push({ event: 'STATUS_CHANGED', object: x }));
    myFormValueChanges$.subscribe(x => this.events.push({ event: 'VALUE_CHANGED', object: x }));
  }
  saveUserData(model, isValid: boolean) {
    this.submitted = true;
    console.log(model);
    console.log("Form Valid =", isValid);
    console.log("Name Error=", this.saveUserForm.controls['name'].errors);
    console.log("Email Error=", this.saveUserForm.controls['email'].errors);
    //console.log(this.submitted, this.saveUserForm.controls['name'].pristine, this.saveUserForm.controls['name'].hasError('required'));
    //console.log(this.submitted, this.saveUserForm.controls['name'].pristine, this.saveUserForm.controls['name'].hasError('minLength'));
    //console.log(this.submitted, this.saveUserForm.controls['name'].pristine, this.saveUserForm.controls['name'].hasError('maxLength'));
    //this.postData = this.saveUserForm.value;
    //console.log(this.postData);
  }

  isInvalidEmail(control) {
    //console.log("Control=", control.value);  
    // if(control.value.lenght>0){
    //return {isInvalidEmail:true};
    // }

    var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    if (control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
      return { isInvalidEmail: true };
    }
    return null;
  }

}
