import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { AppConfig } from 'src/app/@utils/const/app.config';
@Component({
  selector: 'app-add-edit-project',
  templateUrl: './add-edit-project.component.html',
  styleUrls: ['./add-edit-project.component.scss']
})
export class AddEditProjectComponent implements OnInit {
  submitted = false;
  loading = false;
  id: any = '';
  isAdd = true;
  title = 'Add';

  DataStatus: Array<any> = [
    { id: 'Y', name: 'Active' },
    { id: 'N', name: 'Inactive' }
  ];

  myForm = this.fb.group({
    id: [null],
    action: ['add'],
    projectNumber: ['', [Validators.required]],
    projectName: ['', [Validators.required, this.validator.alphaNumericWithSpace]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    description: [''],
    status: ['Y', [Validators.required]]
  });

  constructor(
    private fb: UntypedFormBuilder,
    private validator: FormValidationService,
    private apiSvc: ApiService,
    private alertSvc: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.myForm.valid && this.myForm.get('action')?.value === 'add') {
      this.apiSvc.post(AppConfig.apiUrl.addProject, this.myForm.value).subscribe({
        next: (response: any) => {
          if (response.status == 'success') {
            this.alertSvc.success(response.message, true);
            this.myForm.reset();
            this.router.navigate(['project/manage']);
          }
        },
        error: () => { this.loading = false; },
        complete: () => { this.loading = false; }
      });
    }
    else if (this.myForm.valid && this.myForm.get('action')?.value === 'edit' && this.myForm.get('id')?.value) {
      this.apiSvc.put(AppConfig.apiUrl.updateProject, this.myForm.value).subscribe({
        next: (response: any) => {
          if (response.status == 'success') {
            this.alertSvc.success(response.message, true);
            this.myForm.reset();
            this.router.navigate(['project']);
          }
        },
        error: () => { this.loading = false; },
        complete: () => { this.loading = false; }
      });
    }
    else {
      this.loading = false;
      this.validator.validateAllFormFields(this.myForm);
    }

  }

  getAddress() {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('id', this.id);
    const options = { params: queryParams };
    this.apiSvc.get(AppConfig.apiUrl.getAddress, options).subscribe((val: any) => {
      this.patchFormValue(val?.data?.address[0]);
    });
  }

  patchFormValue(data: any) {
    this.myForm.patchValue({
      id: data?.id,
      action: 'edit',
      addressType: data?.address_type,
      addressLine1: data?.address,
      addressLine2: data?.locality,
      city: data?.city,
      state: data?.state,
      zip: data?.zip,
      landmark: data?.landmark,
      phone: data?.phone1
    });
  }

}
