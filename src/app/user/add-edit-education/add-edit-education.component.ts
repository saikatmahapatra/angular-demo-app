import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { AppConfig } from 'src/app/@utils/const/app.config';
@Component({
  selector: 'app-add-edit-education',
  templateUrl: './add-edit-education.component.html',
  styleUrls: ['./add-edit-education.component.scss']
})
export class AddEditEducationComponent implements OnInit {
  submitted = false;
  loading = false;
  id: any = '';
  isAdd = true;
  title = 'Add';
  qualificationList!: Array<any>;
  degreeList!: Array<any>;
  institutionList!: Array<any>;
  specializationList!: Array<any>;
  minYear = new Date().getFullYear() - 100;
  maxYear = new Date().getFullYear() + 2;

  constructor(private fb: UntypedFormBuilder,
    private validator: FormValidationService,
    private apiSvc: ApiService,
    private router: Router,
    private alertSvc: AlertService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.addNewDegreeValidator();
    this.addNewInstituteValidator();
    this.addNewSpecializationValidator();
    this.getFormData();
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    if (this.router.url.indexOf('edit-education') != -1) {
      this.isAdd = false;
      this.title = 'Edit';
      this.myForm.controls['action'].setValue('edit');
    }
    if (this.id) {
      this.getEducation();
    }
  }

  myForm = this.fb.group({
    id: [null],
    action: ['add'],
    qualification: ['', [Validators.required]],
    degree: ['', [Validators.required]],
    newDegree: [null],
    specialization: ['', [Validators.required]],
    newSpecialization: [null],
    institute: ['', Validators.required],
    newInstitute: [null],
    //fromYear: [new Date().getFullYear(), [Validators.required, Validators.min(this.minYear), Validators.max(this.maxYear)]],
    toYear: [new Date().getFullYear(), [Validators.required, Validators.min(this.minYear), Validators.max(this.maxYear)]],
    marks: ['', Validators.required]
  });

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.myForm.valid && this.myForm.get('action')?.value === 'add') {
      this.apiSvc.post(AppConfig.apiUrl.addEducation, this.myForm.value).subscribe({
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
      this.apiSvc.put(AppConfig.apiUrl.updateEducation, this.myForm.value).subscribe({
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

  getFormData() {
    this.apiSvc.get(AppConfig.apiUrl.academicFormData).subscribe((val: any) => {
      this.qualificationList = val?.data?.qualification;
      this.degreeList = val?.data?.degree;
      this.institutionList = val?.data?.inst;
      this.specializationList = val?.data?.specialization;
    });
  }

  addNewInstituteValidator() {
    const dep = this.myForm.controls['institute'];
    const field = this.myForm.controls['newInstitute'];
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

  addNewSpecializationValidator() {
    const dep = this.myForm.controls['specialization'];
    const field = this.myForm.controls['newSpecialization'];
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

  addNewDegreeValidator() {
    const dep = this.myForm.controls['degree'];
    const field = this.myForm.controls['newDegree'];
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

  getEducation() {
    let queryParams = new HttpParams();
    if (this.id) {
      queryParams = queryParams.append('id', this.id);
    }
    let options = {};
    options = { params: queryParams };
    this.apiSvc.get(AppConfig.apiUrl.getEducation, options).subscribe((val: any) => {
      this.patchFormValue(val?.data?.education[0]);
    });
  }

  patchFormValue(data: any) {
    this.myForm.patchValue({
      id: data?.id,
      action: 'edit',
      qualification: data?.academic_qualification,
      degree: data?.academic_degree,
      newDegree: null,
      specialization: data?.academic_specialization,
      newSpecialization: null,
      institute: data?.academic_institute,
      newInstitute: null,
      //fromYear: data?.academic_from_year,
      toYear: data?.academic_to_year,
      marks: data?.academic_marks_percentage
    });
  }

}
