import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { AppConfig } from 'src/app/@utils/const/app.config';
@Component({
  selector: 'app-add-edit-experience',
  templateUrl: './add-edit-experience.component.html',
  styleUrls: ['./add-edit-experience.component.scss']
})
export class AddEditExperienceComponent implements OnInit {
  submitted = false;
  loading = false;
  designations: any;
  employers: any;
  minDate: Date = new Date();
  maxDate: Date = new Date();
  itemId!: any;
  isAdd = true;
  title = 'Add';

  myForm = this.fb.group({
    id: [null],
    action: ['add'],
    employer: ['', [Validators.required]],
    newEmployer: [null],
    designation: ['', [Validators.required]],
    newDesignation: [null],
    fromDate: ['', Validators.required],
    toDate: ['', Validators.required]
  });

  constructor(private fb: UntypedFormBuilder,
    private validator: FormValidationService,
    private apiSvc: ApiService,
    private router: Router,
    private activatedRouters: ActivatedRoute,
    private alertSvc: AlertService) { }

  ngOnInit(): void {
    this.addNewEmployerValidator();
    this.addNewDesignationValidator();
    this.getFormData();
    this.activatedRouters.paramMap.subscribe((param) => {
      this.itemId = param.get('id');
    });
    if (this.router.url.indexOf('edit-work-experience') != -1) {
      this.isAdd = false;
      this.title = 'Edit';
      this.myForm.controls['action'].setValue('edit');
    }
    if (this.itemId) {
      this.getWorkExperience();
    }
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.myForm.valid && this.myForm.get('action')?.value === 'add') {
      this.apiSvc.post(AppConfig.apiUrl.addExperience, this.myForm.value).subscribe({
        next: (response: any) => {
          this.alertSvc.success(response.message, true);
          this.myForm.reset();
          this.router.navigate(['user/profile']);
        },
        error: () => { this.loading = false; },
        complete: () => { this.loading = false; }
      });
    } else if (this.myForm.valid && this.myForm.get('action')?.value === 'edit' && this.myForm.get('id')?.value) {
      this.apiSvc.put(AppConfig.apiUrl.updateExperience, this.myForm.value).subscribe({
        next: (response: any) => {
          this.alertSvc.success(response.message, true);
          this.myForm.reset();
          this.router.navigate(['user/profile']);
        },
        error: () => { this.loading = false; },
        complete: () => { this.loading = false; }
      });
    } else {
      this.loading = false;
      this.validator.validateAllFormFields(this.myForm);
    }
  }

  addNewEmployerValidator() {
    const dep = this.myForm.controls['employer'];
    const field = this.myForm.controls['newEmployer'];
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

  addNewDesignationValidator() {
    const dep = this.myForm.controls['designation'];
    const field = this.myForm.controls['newDesignation'];
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

  getFormData() {
    this.apiSvc.get(AppConfig.apiUrl.experienceFormData).subscribe((val: any) => {
      this.employers = val?.data?.employer;
      this.designations = val?.data?.designation;
    });
  }

  getWorkExperience() {
    let queryParams = new HttpParams();
    if (this.itemId) {
      queryParams = queryParams.append('id', this.itemId);
    }
    let options = {};
    options = { params: queryParams };
    this.apiSvc.get(AppConfig.apiUrl.getExperience, options).subscribe((val: any) => {
      this.patchFormValue(val?.data?.jobExp[0]);
    });
  }

  patchFormValue(data: any) {
    this.myForm.patchValue({
      id: data?.id,
      action: 'edit',
      employer: data?.company_id,
      newEmployer: null,
      designation: data?.designation_id,
      newDesignation: null,
      fromDate: new Date(data?.from_date),
      toDate: new Date(data?.to_date)
    });
  }

}
