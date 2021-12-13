import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidationService } from 'src/app/shared/services/validation.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ValidationService]
})
export class LoginComponent implements OnInit {
  
  myForm = this.fb.group({
    userName: ['', [Validators.required, this.validator.validEmail]],
    password: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private validator: ValidationService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.myForm.value);
  }

}
