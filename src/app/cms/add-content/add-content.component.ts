import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { CommonService } from 'src/app/@core/services/common.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { CustomAppConfig } from 'src/app/@utils/const/custom-app.config';
@Component({
    selector: 'app-add-content',
    templateUrl: './add-content.component.html',
    styleUrls: ['./add-content.component.scss'],
    standalone: false
})
export class AddContentComponent implements OnInit {
  post = [];
  title = 'Add New';
  loading = false;
  id: any = '';
  isAdd = true;
  submitted = false;
  showEditor = true;
  contentStyle = 'body { color: inherit; }';
  contentCategoryList = [
    {id: 'notice', name: 'Notice'},
    {id: 'news', name: 'News'},
    {id: 'policy', name: 'HR Policy'},
    //{id: 'mandatory_holiday', name: 'Mandatory Holiday'},
    //{id: 'optional_holiday', name: 'Optional Holiday'},
  ];

  dataStatus: Array<any> = [
    { name: 'Yes', id: 'Y' },
    { name: 'No', id: 'N' }
  ];

  myForm = this.fb.group({
    id: [null],
    action: ['add'],
    contentCategory: ['', [Validators.required]],
    contentHeadline: ['', [Validators.required, this.validator.notEmpty]],
    contentDescription: ['', [Validators.required, this.validator.notEmpty]],
    contentStatus: ['Y'],
    sendEmailNotification: [true]
  });

  emailNotifyDistro = '';

  constructor(
    private fb: UntypedFormBuilder,
    private commonSvc: CommonService,
    private router: Router,
    private alertSvc: AlertService,
    private activatedRoute: ActivatedRoute,
    private apiSvc: ApiService,
    private validator: FormValidationService
  ) { 
  }

  ngOnInit(): void {
    if (this.router.url.indexOf('edit') != -1) {
      this.isAdd = false;
      this.title = 'Edit';
      this.myForm.controls['action'].setValue('edit');
    }

    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    if (this.id) {
      this.getContent();
    }
    if(localStorage.getItem('theme') === 'dark') {
      this.contentStyle = 'body { color: #adb5bd; }'
    }
    this.commonSvc.setTitle(this.title+' Content');
    this.getSettings();
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.myForm.valid && this.myForm.get('action')?.value === 'add') {
      this.apiSvc.post(CustomAppConfig.apiUrl.addPost, this.myForm.value).subscribe({
        next: (response: any) => {
          this.router.navigate(['cms/manage-cms']);
          this.alertSvc.setAlert('success', response.message, true);
        },
        error: () => { this.loading = false; },
        complete: () => { this.loading = false; }
      });
    }
    else if (this.myForm.valid && this.myForm.get('action')?.value === 'edit' && this.myForm.get('id')?.value) {
      this.apiSvc.put(CustomAppConfig.apiUrl.updatePost, this.myForm.value).subscribe({
        next: (response: any) => {
          this.router.navigate(['cms/manage-cms']);
          this.alertSvc.setAlert('success', response.message, true);
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

  getContent() {
    let queryParams = new HttpParams();
    if (this.id) {
      queryParams = queryParams.append('id', this.id);
    }
    let options = {};
    queryParams = queryParams.append('pageName', 'managePosts');
    options = { params: queryParams };
    this.apiSvc.get(CustomAppConfig.apiUrl.getPosts, options).subscribe({
      next: (response: any) => {
        this.patchFormValue(response?.data['data_rows'][0]);
      },
      error: () => {

      },
      complete: () => {
        //this.markAsRead();
      }
    });
  }

  patchFormValue(data: any) {
    this.myForm.patchValue({
      id: data?.id,
      action: 'edit',
      contentCategory: data?.content_type,
      contentHeadline: data?.content_title,
      contentDescription: data?.content_text,
      contentStatus: data?.content_status
    });
  }

  getSettings() {
    this.apiSvc.get(CustomAppConfig.apiUrl.getSettings).subscribe({
      next: (response: any) => {
        if(response?.data) {
          if(response?.data?.emailNotifyDistro) {
            this.emailNotifyDistro = response?.data?.emailNotifyDistro || '';
          }
        }
      },
      error: (response: HttpErrorResponse) => {
      }
    });
  }

}
