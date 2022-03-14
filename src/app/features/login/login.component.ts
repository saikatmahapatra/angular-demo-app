import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { LoginService } from 'src/app/core/services/login.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ValidationService } from 'src/app/shared/services/validation.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ValidationService, LoginService]
})
export class LoginComponent implements OnInit {
  
  myForm = this.fb.group({
    userName: ['', [Validators.required, this.validator.validEmail]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder, 
    private validator: ValidationService, 
    private loginSvc: LoginService,
    private alertSvc: AlertService,
    private spinnerSvc: SpinnerService
    ) { }

  ngOnInit() {
  }

  onSubmit() {
    const postData = this.myForm.value;
    this.loginSvc.login(postData).subscribe({
      next: (val) => {
        console.log('next', val);
        this.spinnerSvc.show();
      }, 
      error: (err) => {
        this.alertSvc.error(err, false);
      },
      complete: ()=> {}
    });
  }

}
