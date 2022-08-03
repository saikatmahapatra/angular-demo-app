import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/@core/services/api.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
@Component({
  selector: 'app-add-edit-experience',
  templateUrl: './add-edit-experience.component.html',
  styleUrls: ['./add-edit-experience.component.scss']
})
export class AddEditExperienceComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private validator: FormValidationService,
    private apiSvc: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.addNewEmployerValidator();
    this.addNewDesignationValidator();
  }

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

  onSubmit() {
    console.log('onSubmit===', this.myForm);
    if (this.myForm.valid) {
      console.log('form submitted', this.myForm.value);
    } else {
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

}
