import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/@core/services/api.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
@Component({
  selector: 'app-add-edit-education',
  templateUrl: './add-edit-education.component.html',
  styleUrls: ['./add-edit-education.component.scss']
})
export class AddEditEducationComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private validator: FormValidationService,
    private apiSvc: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.addNewDegreeValidator();
    this.addNewInstituteValidator();
    this.addNewSpecializationValidator();
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
    console.log('onSubmit===', this.myForm);
    if (this.myForm.valid) {
      console.log('form submitted', this.myForm.value);
    } else {
      this.validator.validateAllFormFields(this.myForm);
    }
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
