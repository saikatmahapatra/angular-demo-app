import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../@core/services/common.service';
import { ApiService } from '../../@core/services/api.service';
import { AlertService } from 'src/app/@core/services/alert.service';
import { of, Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  providers: [ApiService]
})
export class ManageUsersComponent implements OnInit {

  public saveUserForm!: FormGroup;
  public submitted!: boolean;
  public events: any[] = [];
  public userList: any;
  public postData = {};
  subscription !: Subscription;

  constructor(private apiSvc: ApiService, public formBuilder: FormBuilder, private commonSvc: CommonService, private alertService: AlertService) {

  }

  ngOnInit() {
    this.getUsersList();

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

  getUsersList() {
    this.apiSvc.getUsersTest().subscribe({
      next: (val: any) => {
        this.userList = val?.data;
      },
      error: (err) => {
        this.alertService.error(err, false);
        //this.errorMessage = error;
        //this.loading = false;
        throw err;
      },
      complete: () => { }
    });
  }

  showDetails(e: { preventDefault: () => void; }) {
    e.preventDefault();
    alert('details');
  }

  subcribeToFormChanges() {
    const myFormStatusChanges$ = this.saveUserForm.statusChanges;
    const myFormValueChanges$ = this.saveUserForm.valueChanges;

    myFormStatusChanges$.subscribe(x => this.events.push({ event: 'STATUS_CHANGED', object: x }));
    myFormValueChanges$.subscribe(x => this.events.push({ event: 'VALUE_CHANGED', object: x }));
  }
  saveUserData(model: any, isValid: boolean) {
    this.submitted = true;
    console.log(model);
    console.log("Form Valid =" + isValid);
    console.log("Name Error=" + this.saveUserForm.controls['name'].errors);
    console.log("Email Error=" + this.saveUserForm.controls['email'].errors);
    //console.log(this.submitted, this.saveUserForm.controls['name'].pristine, this.saveUserForm.controls['name'].hasError('required'));
    //console.log(this.submitted, this.saveUserForm.controls['name'].pristine, this.saveUserForm.controls['name'].hasError('minLength'));
    //console.log(this.submitted, this.saveUserForm.controls['name'].pristine, this.saveUserForm.controls['name'].hasError('maxLength'));
    //this.postData = this.saveUserForm.value;
    //console.log(this.postData);
  }

  isInvalidEmail(control: any) {
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


  getUserInterval() {
    this.subscription = timer(0, 10000).pipe(
      switchMap(() => this.apiSvc.getUsersTest())
    ).subscribe({
      next: (val: any) => {
        this.userList = val?.data;
      },
      error: (err) => {
        this.alertService.error(err, false);
        //this.errorMessage = error;
        //this.loading = false;
        throw err;
      },
      complete: () => { }
    });
  }

}
