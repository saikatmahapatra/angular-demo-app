import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ApiService } from 'src/app/@core/services/api.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
@Component({
  selector: 'app-add-edit-basic-info',
  templateUrl: './add-edit-basic-info.component.html',
  styleUrls: ['./add-edit-basic-info.component.scss']
})
export class AddEditBasicInfoComponent implements OnInit {
  submitted = false;
  loading = false;
  bloodGroupList = [
    { "id": "A+", "name": "A+" },
    { "id": "A-", "name": "A-" },
    { "id": "B+", "name": "B+" },
    { "id": "B-", "name": "B-" },
    { "id": "AB+", "name": "AB+" },
    { "id": "AB-", "name": "AB-" },
    { "id": "O+", "name": "O+" },
    { "id": "O-", "name": "O-" },
    { "id": "Unknown", "name": "Unknown" }
  ]
  constructor(private fb: FormBuilder, private validator: FormValidationService, private apiSvc: ApiService) { }

  ngOnInit(): void {

  }


  myForm = this.fb.group({
    id: [null],
    action: ['edit'],
    personalEmail: ['', [Validators.required, this.validator.validEmail]],
    personalPhone: ['', [Validators.required, this.validator.phoneNumber]],
    workPhone: ['', [Validators.required, this.validator.phoneNumber]],
    bloodGroup: ['', Validators.required]
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
