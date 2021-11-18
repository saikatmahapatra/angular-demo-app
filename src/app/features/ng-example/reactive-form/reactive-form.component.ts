import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  providers: []
})
export class ReactiveFormComponent implements OnInit {

  myForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    phone: [''],
    city: [''],
    gender: [''],
    skill: [''],
    termsAccepted: ['']
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // this.name.setValue('Saikat');
    // this.name.valueChanges.subscribe((val) => {
    //   console.log('Changed Value =', val)
    // })
  }

  onSubmit() {
    console.log('onSubmit===',this.myForm.value);
  }

}
