import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidationService } from 'src/app/shared/services/validation.service';
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  providers: [ValidationService]
})
export class ReactiveFormComponent implements OnInit {

  myForm = this.fb.group({
    firstName: ['', [Validators.required, this.validator.test1, this.validator.test2, this.validator.test3]],
    lastName: [''],
    email: ['', [Validators.required, this.validator.validEmail]],
    phone: [''],
    city: [''],
    gender: [''],
    skill: [''],
    termsAccepted: ['']
  });

  constructor(private fb: FormBuilder, private validator: ValidationService) { }

  ngOnInit() {
    // this.name.setValue('Saikat');
    // this.name.valueChanges.subscribe((val) => {
    //   console.log('Changed Value =', val)
    // })
  }

  onSubmit() {
    console.log('onSubmit===', this.myForm);
  }

}
