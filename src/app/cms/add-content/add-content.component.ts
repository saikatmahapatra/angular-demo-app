import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { AppConfig } from 'src/app/@utils/const/app.config';
@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.scss']
})
export class AddContentComponent implements OnInit {
  post = [];
  title = 'Add New';
  loading = false;
  id: any = '';
  isAdd = true;
  submitted = false;
  showEditor = true;

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
    contentHeadline: ['', [Validators.required]],
    contentDescription: ['', [Validators.required]],
    contentStatus: ['Y']
  })

  constructor(
    private fb: UntypedFormBuilder,
    private validationSvc: FormValidationService,
    private router: Router,
    private alertSvc: AlertService,
    private activatedRoute: ActivatedRoute,
    private apiSvc: ApiService,
    private validator: FormValidationService
  ) { }

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
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.myForm.valid && this.myForm.get('action')?.value === 'add') {
      this.apiSvc.post(AppConfig.apiUrl.addPost, this.myForm.value).subscribe({
        next: (response: any) => {
          this.router.navigate(['cms']);
          this.alertSvc.success(response.message, true);
        },
        error: () => { this.loading = false; },
        complete: () => { this.loading = false; }
      });
    }
    else if (this.myForm.valid && this.myForm.get('action')?.value === 'edit' && this.myForm.get('id')?.value) {
      this.apiSvc.put(AppConfig.apiUrl.updatePost, this.myForm.value).subscribe({
        next: (response: any) => {
          this.router.navigate(['cms']);
          this.alertSvc.success(response.message, true);
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
    this.apiSvc.get(AppConfig.apiUrl.getPosts, options).subscribe({
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

}
