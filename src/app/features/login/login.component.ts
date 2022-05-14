import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray, NgForm } from '@angular/forms';
import { LoginService } from 'src/app/core/services/login.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { ValidationService } from 'src/app/core/services/validation.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ValidationService, LoginService]
})
export class LoginComponent implements OnInit {

  constructor(
    private validator: ValidationService, 
    private loginSvc: LoginService,
    private alertSvc: AlertService,
    private spinnerSvc: SpinnerService
    ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if(form.status === 'VALID') {
      const postData = form.value;
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

}
