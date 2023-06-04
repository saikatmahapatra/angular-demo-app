import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { AppConfig } from 'src/app/@utils/const/app.config';
@Component({
  selector: 'app-add-edit-payroll-info',
  templateUrl: './add-edit-payroll-info.component.html',
  styleUrls: ['./add-edit-payroll-info.component.scss']
})
export class AddEditPayrollInfoComponent implements OnInit {

  submitted = false;
  loading = false;
  id: any = '';
  isAdd = true;
  title = 'Add';
  bankList!: Array<any>;  

  myForm = this.fb.group({
    id: [null],
    action: ['add'],
    panNo: [null, [this.validator.validPAN]],
    uanNo: [null, [this.validator.notEmpty]],
    bank: [null, Validators.required],
    ifscCode: [null, [Validators.required, this.validator.notEmpty]],
    accountNo: [null, [Validators.required, this.validator.notEmpty, this.validator.matchValidator('confirmAccountNo', true)]],
    confirmAccountNo: [null, [Validators.required, this.validator.notEmpty, this.validator.matchValidator('accountNo')]]
  });
  constructor(private fb: UntypedFormBuilder,
    private validator: FormValidationService,
    private apiSvc: ApiService,
    private alertSvc: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getFormData();
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    if (this.router.url.indexOf('edit-payroll-info') != -1) {
      this.isAdd = false;
      this.title = 'Edit';
      this.myForm.controls['action'].setValue('edit');
    }
    if (this.id) {
      this.getData();
    }
  }

  getFormData() {
    this.apiSvc.get(AppConfig.apiUrl.payrollFormData).subscribe((response: any) => {
      this.bankList = response?.data?.banks;
      this.myForm.controls['panNo'].setValue(response?.data?.govtIDs[0]?.user_pan_no);
      this.myForm.controls['uanNo'].setValue(response?.data?.govtIDs[0]?.user_uan_no);
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.myForm.valid && this.myForm.get('action')?.value === 'add') {
      this.apiSvc.post(AppConfig.apiUrl.addPayroll, this.myForm.value).subscribe({
        next: (response: any) => {
          if (response.status == 'success') {
            this.alertSvc.success(response.message, true);
            this.myForm.reset();
            this.router.navigate(['emp/my-profile']);
          }
        },
        error: () => { this.loading = false; },
        complete: () => { this.loading = false; }
      });
    }
    else if (this.myForm.valid && this.myForm.get('action')?.value === 'edit' && this.myForm.get('id')?.value) {
      this.apiSvc.put(AppConfig.apiUrl.updatePayroll, this.myForm.value).subscribe({
        next: (response: any) => {
          if (response.status == 'success') {
            this.alertSvc.success(response.message, true);
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

  getData() {
    let queryParams = new HttpParams();
    if (this.id) {
      queryParams = queryParams.append('id', this.id);
    }
    let options = {};
    options = { params: queryParams };
    this.apiSvc.get(AppConfig.apiUrl.getPayroll, options).subscribe((val: any) => {
      this.patchFormValue(val?.data?.payrollInfo[0]);
    });
  }

  patchFormValue(data: any) {
    this.myForm.patchValue({
      id: data?.id,
      action: 'edit',
      bank: data?.bank_id,
      ifscCode: data?.ifsc_code,
      accountNo: data?.bank_account_no,
      confirmAccountNo: data?.bank_account_no
    });
  }

}
