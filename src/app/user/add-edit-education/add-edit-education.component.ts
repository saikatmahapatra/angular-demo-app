import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Route, Router } from '@angular/router';
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
    
  }

  myForm = this.fb.group({
    id: [null],
    action: ['add'],
    qualification: ['', [Validators.required]],
    degree: ['', [Validators.required]],
    specialization: ['', [Validators.required]],
    institute: ['', Validators.required],
    newInstitute: ['', this.addNewInstituteValidator],
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

  addNewInstituteValidator(formControl: AbstractControl) {
    console.log(formControl);
    // const parentControl = this.myForm.controls['institute'];
    // if (parentControl.value === '-1') {
    //   return Validators.required(formControl); 
    // }
    // return null;
  }

}
