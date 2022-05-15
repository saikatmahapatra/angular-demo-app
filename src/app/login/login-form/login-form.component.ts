import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { FormValidationService } from 'src/app/core/services/form-validation.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  providers: [AuthService]
})
export class LoginFormComponent implements OnInit {

  constructor(
    private authSvc: AuthService,
    private alertSvc: AlertService,
    private spinnerSvc: SpinnerService,
    private router: Router
  ) {
   }

  ngOnInit(): void {
    if(this.authSvc.isLoggedIn()) {
      this.router.navigate(['./dashboard']);
    }
  }

  onSubmit(form: NgForm) {
    if(form.status === 'VALID') {
      const postData = form.value;
      this.authSvc.authenticate(postData).subscribe({
        next: (response: any) => {
          if(response['status'] == 'success') {
            sessionStorage.setItem('loginData', JSON.stringify(response.data));
            this.router.navigate(['./dashboard']);
          }
          this.spinnerSvc.show();
        }, 
        error: (err) => {
          if(err?.error?.message) {
            this.alertSvc.error(err?.error?.message, false);
          } else {
            this.alertSvc.error(err.statusText, false);
          }
          
        },
        complete: ()=> {
          this.spinnerSvc.hide();
        }
      });
    }
    
  }

}
