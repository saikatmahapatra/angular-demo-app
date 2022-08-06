import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { State } from 'src/app/@utils/models/IState';


@Component({
  selector: 'app-add-edit-address',
  templateUrl: './add-edit-address.component.html',
  styleUrls: ['./add-edit-address.component.scss']
})
export class AddEditAddressComponent implements OnInit {
  submitted = false;
  loading = false;
  stateList: State[] = [];
  constructor(private fb: FormBuilder,
    private validator: FormValidationService,
    private apiSvc: ApiService,
    private router: Router,
    private alertSvc: AlertService) { }

  addressType: Array<any> = [
    { id: 'P', name: 'Permanent' },
    { id: 'C', name: 'Present' },
    { id: 'W', name: 'Work' }
  ];

  ngOnInit(): void {
    // get action name & id for PUT call
    this.getFormData();
  }

  myForm = this.fb.group({
    id: [null],
    action: ['add'],
    addressType: ['', [Validators.required]],
    addressLine1: ['', [Validators.required]],
    addressLine2: [''],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', Validators.required],
    landmark: [''],
    phone: ['', this.validator.phoneNumber]
  });

  getFormData() {
    this.apiSvc.getUserFormData().subscribe({
      next: (val: any) => {
        this.stateList = val?.data?.states;
      },
      error: (err) => {
        this.alertSvc.error(err, false);
      },
      complete: () => { }
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.myForm.valid) {
      this.apiSvc.createAddress(this.myForm.value).subscribe({
        next: (response: any) => {
          if(response.status == 'success') {
            this.alertSvc.success(response.message, true);
            this.myForm.reset();
            this.router.navigate(['user/profile']);
          }
          if(response.status == 'error') {
            this.alertSvc.error(response.message);
          }
        }, 
        error: (err) => {
          this.alertSvc.error(err?.error?.message);
          this.loading = false;
        },
        complete: ()=> {
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
      this.validator.validateAllFormFields(this.myForm);
    }
  }

}
