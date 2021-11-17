import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  providers: []
})
export class ReactiveFormComponent implements OnInit {

  myForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    city: new FormControl(),
    gender: new FormControl(),
    skill: new FormControl(),
    termsAccepted: new FormControl()
  });

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
