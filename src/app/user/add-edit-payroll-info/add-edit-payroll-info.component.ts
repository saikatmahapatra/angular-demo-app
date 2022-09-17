import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ApiService } from 'src/app/@core/services/api.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service'; ''
@Component({
  selector: 'app-add-edit-payroll-info',
  templateUrl: './add-edit-payroll-info.component.html',
  styleUrls: ['./add-edit-payroll-info.component.scss']
})
export class AddEditPayrollInfoComponent implements OnInit {
  
  submitted = false;
  loading = false;
  
  myForm = this.fb.group({
    id: [null],
    action: ['edit'],
    panNo: [null, [Validators.required, this.validator.validPAN]],
    uanNo: [null, [Validators.required]],
    bank: [null, Validators.required],
    ifscCode: [null, Validators.required],
    accountNo: [null, [Validators.required, this.validator.matchValidator('confirmAccountNo', true)]],
    confirmAccountNo: [null, [Validators.required, this.validator.matchValidator('accountNo')]]
  });
  constructor(private fb: FormBuilder, private validator: FormValidationService, private apiSvc: ApiService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('onSubmit===', this.myForm);
    if (this.myForm.valid) {
      console.log('form submitted', this.myForm.value);
    } else {
      this.validator.validateAllFormFields(this.myForm);
    }
  }

}
