import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ApiService } from 'src/app/@core/services/api.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service'; ''
@Component({
  selector: 'app-add-edit-bank-info',
  templateUrl: './add-edit-bank-info.component.html',
  styleUrls: ['./add-edit-bank-info.component.scss']
})
export class AddEditBankInfoComponent implements OnInit {

  // accountFor: Array<any> = [
  //   { id: 'G', name: 's' },
  //   { id: 'Y', name: 's' }
  // ];

  constructor(private fb: FormBuilder, private validator: FormValidationService, private apiSvc: ApiService) { }

  ngOnInit(): void {
  }


  myForm = this.fb.group({
    id: [null],
    action: ['edit'],
    panNo: [null, [Validators.required, Validators.maxLength(2)]],
    uanNo: [null, [Validators.required]],
    // accountFor: ['', [Validators.required]],
    bank: [null, Validators.required],
    ifscCode: [null, Validators.required],
    accountNo: [null, [Validators.required, this.validator.matchValidator('confirmAccountNo', true)]],
    confirmAccountNo: [null, [Validators.required, this.validator.matchValidator('accountNo')]]
  });

  onSubmit() {
    console.log('onSubmit===', this.myForm);
    if (this.myForm.valid) {
      console.log('form submitted', this.myForm.value);
    } else {
      this.validator.validateAllFormFields(this.myForm);
    }
  }

}
