import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ApiService } from 'src/app/@core/services/api.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';


@Component({
  selector: 'app-add-edit-address',
  templateUrl: './add-edit-address.component.html',
  styleUrls: ['./add-edit-address.component.scss']
})
export class AddEditAddressComponent implements OnInit {
  submitted = false;
  loading = false;
  constructor(private fb: FormBuilder,
    private validator: FormValidationService,
    private apiSvc: ApiService,
    private router: Router) { }

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
    addressType: ['', [Validators.required]],
    addressLine1: ['', [Validators.required]],
    addressLine2: [''],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', Validators.required],
    landmark: [''],
    phone: ['', this.validator.phoneNumber]
  });

  onSubmit() {
    //console.log('onSubmit===', this.myForm);
    this.loading = true;
    if (this.myForm.valid) {
      console.log('form submitted', this.myForm.value);
    } else {
      this.validator.validateAllFormFields(this.myForm);
    }
  }

}
