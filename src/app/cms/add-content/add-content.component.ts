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
  title = 'Add New';
  loading = false;
  id: any = '';
  isAdd = true;
  submitted = false;

  contentCategoryList = [
    {id: 'news', name: 'News Updates'},
    {id: 'notice', name: 'Notice'},
    {id: 'policy', name: 'HR Policy'}
  ];

  myForm = this.fb.group({
    id: [null],
    action: ['add'],
    contentCategory: ['', [Validators.required]],
    contentHeadline: ['', [Validators.required]],
    contentDescription: ['', [Validators.required]]
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
      this.apiSvc.post(AppConfig.apiUrl.addContent, this.myForm.value).subscribe({
        next: (response: any) => {
        },
        error: () => { this.loading = false; },
        complete: () => { this.loading = false; }
      });
    }
    else if (this.myForm.valid && this.myForm.get('action')?.value === 'edit' && this.myForm.get('id')?.value) {
      this.apiSvc.put(AppConfig.apiUrl.updateAddress, this.myForm.value).subscribe({
        next: (response: any) => {
          
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

  }

}
