import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { CommonService } from 'src/app/@core/services/common.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { CustomAppConfig } from 'src/app/@utils/const/custom-app.config';
import { State } from 'src/app/@utils/models/IState';

@Component({
    selector: 'app-add-edit-address',
    templateUrl: './add-edit-address.component.html',
    styleUrls: ['./add-edit-address.component.scss'],
    standalone: false
})
export class AddEditAddressComponent implements OnInit {

  submitted = false;
  loading = false;
  stateList: State[] = [];
  cityList: State[] = [];
  id: any = '';
  isAdd = true;
  title = 'Add';
  data: any = '';

  myForm = this.fb.group({
    id: [null],
    action: ['add'],
    addressType: ['', [Validators.required]],
    addressLine1: ['', [Validators.required, this.validator.notEmpty]],
    addressLine2: ['', [this.validator.notEmpty]],
    city: ['', Validators.required],
    newCity: [null],
    state: ['', Validators.required],
    zip: ['', [Validators.required, this.validator.numericOnly]],
    landmark: ['', [this.validator.notEmpty]],
    phone: ['', this.validator.phoneNumber]
  });

  constructor(private fb: UntypedFormBuilder,
    private commonSvc: CommonService,
    private validator: FormValidationService,
    private apiSvc: ApiService,
    private router: Router,
    private alertSvc: AlertService,
    private activatedRoute: ActivatedRoute) { 
      
    }

  addressType: Array<any> = [
    { id: 'P', name: 'Permanent' },
    { id: 'C', name: 'Present' },
    //{ id: 'W', name: 'Work' }
  ];

  ngOnInit(): void {
    this.addNewCityValidator();
    this.getFormData();
    if (this.router.url.indexOf('edit-address') != -1) {
      this.isAdd = false;
      this.title = 'Edit';
      this.myForm.controls['action'].setValue('edit');
    }

    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    if (this.id) {
      this.getAddress();
    }
    this.commonSvc.setTitle(this.title + ' Address');
  }

  getFormData() {
    this.apiSvc.get(CustomAppConfig.apiUrl.userFormData).subscribe((val: any) => {
      this.stateList = val?.data?.states;
      this.cityList = val?.data?.cities;
    });
  }

  addNewCityValidator() {
    const dep = this.myForm.controls['city'];
    const field = this.myForm.controls['newCity'];
    dep?.valueChanges.subscribe((val) => {
      if (val === '-1') {
        field.setValidators([Validators.required]);
      } else {
        field.removeValidators([Validators.required]);
        field.setValue(null);
        field.setErrors(null);
      }
    });
    field.updateValueAndValidity();
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.myForm.valid && this.myForm.get('action')?.value === 'add') {
      this.apiSvc.post(CustomAppConfig.apiUrl.addAddress, this.myForm.value).subscribe({
        next: (response: any) => {
          if (response.status == 'success') {
            this.alertSvc.setAlert('success', response.message, true);
            this.myForm.reset();
            this.router.navigate(['emp/my-profile']);
          }
        },
        error: () => { this.loading = false; },
        complete: () => { this.loading = false; }
      });
    }
    else if (this.myForm.valid && this.myForm.get('action')?.value === 'edit' && this.myForm.get('id')?.value) {
      this.apiSvc.put(CustomAppConfig.apiUrl.updateAddress, this.myForm.value).subscribe({
        next: (response: any) => {
          if (response.status == 'success') {
            this.alertSvc.setAlert('success', response.message, true);
            this.myForm.reset();
            this.router.navigate(['emp/my-profile']);
          }
        },
        error: () => { this.loading = false; },
        complete: () => { this.loading = false; }
      });
    }
    else {
      this.loading = false;
      this.validator.validateAllFormFields(this.myForm);
    }

  }

  getAddress() {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('id', this.id);
    const options = { params: queryParams };
    this.apiSvc.get(CustomAppConfig.apiUrl.getAddress, options).subscribe((val: any) => {
      this.patchFormValue(val?.data?.address[0]);
    });
  }

  patchFormValue(data: any) {
    this.myForm.patchValue({
      id: data?.id,
      action: 'edit',
      addressType: data?.address_type,
      addressLine1: data?.address,
      addressLine2: data?.locality,
      city: data?.city,
      state: data?.state,
      zip: data?.zip,
      landmark: data?.landmark,
      phone: data?.phone1
    });
  }

}
