import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, FormGroup, Validators, FormArray, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/@core/services/auth.service';
import { AlertService } from 'src/app/@core/services/alert.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { CommonService } from 'src/app/@core/services/common.service';


@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
    providers: [AuthService, FormValidationService],
    standalone: false
})
export class LoginFormComponent implements OnInit {
  submitted = false;
  loading = false;

  constructor(
    private commonSvc: CommonService,
    private fb: UntypedFormBuilder,
    private authSvc: AuthService,
    private alertSvc: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private formValidationSvc: FormValidationService
  ) {
    this.commonSvc.setTitle('Login');
  }

  loginForm = this.fb.group({
    userName: ['', [Validators.required, this.formValidationSvc.notEmpty]],
    password: ['', [Validators.required, this.formValidationSvc.notEmpty]]
  })

  ngOnInit(): void {
    if (this.authSvc.isLoggedIn()) {
      this.router.navigate(['/']);
    }
    if (this.router.url === '/auth/logout') {
      this.loading = true;
      this.authSvc.logoutSessionToken().subscribe({
        next: (response: any) => {
        },
        error: () => {
          this.loading = false;
        },
        complete: () => { 
          this.loading = false; 
          this.alertSvc.setAlert('success', 'You have been logged out.', true);
          this.authSvc.clearStorageData();
        }
      });

    }
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.loginForm.valid) {
      const postData = this.loginForm.value;
      this.authSvc.authenticate(postData).subscribe({
        next: (response: any) => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigate([returnUrl]);
        },
        error: () => { this.loading = false; },
        complete: () => { this.loading = false; }
      });

    } else {
      this.loading = false;
      this.formValidationSvc.validateAllFormFields(this.loginForm);
    }

  }
}
