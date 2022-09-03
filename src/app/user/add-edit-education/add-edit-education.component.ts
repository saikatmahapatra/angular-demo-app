import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
@Component({
  selector: 'app-add-edit-education',
  templateUrl: './add-edit-education.component.html',
  styleUrls: ['./add-edit-education.component.scss']
})
export class AddEditEducationComponent implements OnInit {
  [x: string]: any;
  submitted = false;
  loading = false;
  qualificationList!: Array<any>;
  degreeList!: Array<any>;
  institutionList!: Array<any>;
  specializationList!: Array<any>;

  constructor(private fb: FormBuilder,
    private validator: FormValidationService,
    private apiSvc: ApiService,
    private router: Router,
    private alertSvc: AlertService) { }

  ngOnInit(): void {
    this.addNewDegreeValidator();
    this.addNewInstituteValidator();
    this.addNewSpecializationValidator();
    this.getFormData();
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
      if(this.myForm.get('id')?.value) {
        this.apiSvc.updateEducation(this.myForm.value).subscribe({
          next: (response: any) => {
            if(response.status == 'success') {
              this.alertSvc.success(response.message, true);
              this.myForm.reset();
              this.router.navigate(['user/profile']);
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
        this.apiSvc.createEducation(this.myForm.value).subscribe({
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
      }
      
    } else {
      this.loading = false;
      this.validator.validateAllFormFields(this.myForm);
    }
  }

  getFormData() {
    this.apiSvc.getAcademicFormData().subscribe({
      next: (val: any) => {
        this.qualificationList = val?.data?.qualification;
        this.degreeList = val?.data?.degree;
        this.institutionList = val?.data?.inst;
        this.specializationList = val?.data?.specialization;
      },
      error: (err) => {
        //this.alertSvc.error(err, false);
      },
      complete: () => { }
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

}
