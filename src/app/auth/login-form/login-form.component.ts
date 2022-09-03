import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/@core/services/auth.service';
import { AlertService } from 'src/app/@core/services/alert.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';


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
    if (this.authSvc.isLoggedIn()) {
      this.router.navigate(['/']);
    }
    const logout = this.route.snapshot.queryParamMap.get('logout');
    if (logout) {
      this.logout();
    }
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      const postData = this.loginForm.value;
      this.authSvc.authenticate(postData).subscribe((response) => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigate([returnUrl]);
      });
    } else {
      this.formValidationSvc.validateAllFormFields(this.loginForm);
    }

  }

  logout() {
    this.authSvc.logout();
  }

}
