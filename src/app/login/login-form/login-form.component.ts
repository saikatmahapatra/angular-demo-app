import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { FormValidationService } from 'src/app/core/services/form-validation.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  providers: [AuthService, FormValidationService]
})
export class LoginFormComponent implements OnInit {
  submitted = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private alertSvc: AlertService,
    private spinnerSvc: SpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private formValidationSvc: FormValidationService
  ) {
   }

   loginForm = this.fb.group({
     userName: ['', Validators.required],
     password: ['', Validators.required]
   })

  ngOnInit(): void {
    if(this.authSvc.isLoggedIn()) {
      this.router.navigate(['./dashboard']);
    }
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if(this.loginForm.valid) {
      const postData = this.loginForm.value;
      this.authSvc.authenticate(postData).subscribe({
        next: (response: any) => {
          if(response['status'] === '1') {
            sessionStorage.setItem('loginData', JSON.stringify(response.data));
            this.router.navigate(['./dashboard']);
          }
          this.spinnerSvc.show();
        }, 
        error: (err) => {
          this.loading = false;
          if(err?.error?.message) {
            this.alertSvc.error(err?.error?.message, false);
          } else {
            this.alertSvc.error(err.statusText, false);
          }
          
        },
        complete: ()=> {
          this.spinnerSvc.hide();
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
      this.formValidationSvc.validateAllFormFields(this.loginForm);
    }
    
  }

}
