import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { apiUrl } from 'src/app/@utils/const/app.config';
@Component({
  selector: 'app-add-edit-education',
  templateUrl: './add-edit-education.component.html',
  styleUrls: ['./add-edit-education.component.scss']
})
export class AddEditEducationComponent implements OnInit {
  [x: string]: any;
  submitted = false;
  loading = false;
  id: any = '';
  isAdd = true;
  title = 'Add';
  qualificationList!: Array<any>;
  degreeList!: Array<any>;
  institutionList!: Array<any>;
  specializationList!: Array<any>;

  constructor(private fb: FormBuilder,
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
    if (this.id) {
      this.isAdd = false;
      this.title = 'Edit';
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
    fromYear: ['', Validators.required],
    toYear: ['', Validators.required],
    marks: ['', Validators.required]
  });

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.myForm.valid) {
      if (this.myForm.get('id')?.value) {
        this.apiSvc.put(apiUrl.updateEducation, this.myForm.value).subscribe((response: any) => {
          if (response.status == 'success') {
            this.alertSvc.success(response.message, true);
            this.myForm.reset();
            this.router.navigate(['user/profile']);
          }
        });
      } else {
        this.apiSvc.post(apiUrl.addEducation, this.myForm.value).subscribe((response: any) => {
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

  getFormData() {
    this.apiSvc.get(apiUrl.academicFormData).subscribe((val: any) => {
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
    this.apiSvc.get(apiUrl.getEducation, this.id).subscribe((val: any) => {
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
      fromYear: data?.academic_from_year,
      toYear: data?.academic_to_year,
      marks: data?.academic_marks_percentage
    });
  }

}
