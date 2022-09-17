import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { AppConfig } from 'src/app/@utils/const/app.config';
import { State } from 'src/app/@utils/models/IState';

@Component({
  selector: 'app-add-edit-address',
  templateUrl: './add-edit-address.component.html',
  styleUrls: ['./add-edit-address.component.scss']
})
export class AddEditAddressComponent implements OnInit {
  myForm!: FormGroup;
  submitted = false;
  loading = false;
  stateList: State[] = [];
  id: any = '';
  isAdd = true;
  title = 'Add';
  data: any = '';
  formAction = 'add';
  constructor(private fb: FormBuilder,
    private validator: FormValidationService,
    private apiSvc: ApiService,
    private router: Router,
    private alertSvc: AlertService,
    private activatedRoute: ActivatedRoute) { }

  addressType: Array<any> = [
    { id: 'P', name: 'Permanent' },
    { id: 'C', name: 'Present' },
    { id: 'W', name: 'Work' }
  ];

  ngOnInit(): void {
    this.getFormData();
    if (this.router.url.indexOf('edit-address') != -1) {
      this.isAdd = false;
      this.title = 'Edit';
      this.formAction = 'edit'
    }
    this.createForm();
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    if (this.id) {
      this.getAddress();
    }
  }

  createForm() {
    this.myForm = this.fb.group({
      id: [null],
      action: [this.formAction],
      addressType: ['', [Validators.required]],
      addressLine1: ['', [Validators.required]],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      landmark: [''],
      phone: ['', this.validator.phoneNumber]
    });
  }

  getFormData() {
    this.apiSvc.get(AppConfig.apiUrl.userFormData).subscribe((val: any) => {
      this.stateList = val?.data?.states;
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.myForm.valid) {
      if(this.formAction === 'add' && this.myForm.get('id')?.value === null) {
        this.apiSvc.post(AppConfig.apiUrl.addAddress, this.myForm.value).subscribe((response: any) => {
          if (response.status == 'success') {
            this.alertSvc.success(response.message, true);
            this.myForm.reset();
            this.router.navigate(['user/profile']);
          }
        });
      }
      if (this.formAction === 'edit' && this.myForm.get('id')?.value !== null) {
        this.apiSvc.put(AppConfig.apiUrl.updateAddress, this.myForm.value).subscribe((response: any) => {
          if (response.status == 'success') {
            this.alertSvc.success(response.message, true);
            this.myForm.reset();
            this.router.navigate(['user/profile']);
          }
        });
      }
    } else {
      this.loading = false;
      this.validator.validateAllFormFields(this.myForm);
    }
  }

  getAddress() {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('id', this.id);
    const options = { params: queryParams };
    this.apiSvc.get(AppConfig.apiUrl.getAddress, options).subscribe((val: any) => {
      this.patchFormValue(val?.data?.address[0]);
    });
  }

  patchFormValue(data: any) {
    this.myForm.patchValue({
      id: data?.id,
      action: this.formAction,
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
