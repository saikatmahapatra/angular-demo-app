import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ApiService } from 'src/app/@core/services/api.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
@Component({
  selector: 'app-add-edit-emergency-contact',
  templateUrl: './add-edit-emergency-contact.component.html',
  styleUrls: ['./add-edit-emergency-contact.component.scss']
})
export class AddEditEmergencyContactComponent implements OnInit {


  constructor(private fb: FormBuilder,
    private validator: FormValidationService) { }

  addressType: Array<any> = [
    { id: 'P', name: 'Permanent' },
    { id: 'C', name: 'Present' },
    { id: 'W', name: 'Work' }
  ];

  ngOnInit(): void {
    // get action name & id for PUT call
  }

  myForm = this.fb.group({
    id: [null],
    action: ['add'],
    contactPersonName: ['', [Validators.required]],
    relationWithContact: ['', [Validators.required]],
    phoneNo: ['', [Validators.required, this.validator.phoneNumber]],
    communicationAddress: ['']
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
