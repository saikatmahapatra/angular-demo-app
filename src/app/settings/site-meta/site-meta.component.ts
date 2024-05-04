import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { CommonService } from 'src/app/@core/services/common.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { AppConfig } from 'src/app/@utils/const/app.config';

@Component({
  selector: 'app-site-meta',
  templateUrl: './site-meta.component.html',
  styleUrls: ['./site-meta.component.scss']
})
export class SiteMetaComponent {
  dataRow: any;
  metaTypeDropdown: any = ['city','state','country','employment_type','leave_type','family_relationship','asset_type','company','department','designation','degree','institute','qualification','specialization','cms_type','event_type','security_question','site_config','workspace_solution','work_location','work_zone','bank','leave_reason','project_type'];
  selectedMetaType = '';
  // Pagination Config
  currentPageIndex: number = 0;
  first: number = 0;
  totalRecords: number = 0;
  itemPerPage: number = 30;
  itemPerPageDropdown = [10, 20, 30, 50, 100, 150, 200];
  paginate(event: any) {
    this.itemPerPage = event.rows;
    this.currentPageIndex = event.page;
    this.getSiteMeta();
  }
  // Pagination Config


  myForm = this.fb.group({
    id: [null],
    action: ['add'],
    metaType: ['', [Validators.required]],
    metaValue: ['', [Validators.required, this.validator.notEmpty]],
    metaCode: ['', [this.validator.alphaNumericWithoutSpace]],
    metaStatus: ['Y', [Validators.required]],
    newMetaType: [null]
  });
  DataStatus: Array<any> = [
    { id: 'Y', name: 'Active' },
    { id: 'N', name: 'Inactive' }
  ];
  submitted = false;
  loading = false;
  mode = 'add';
  formTitle = "Add Site Meta";
  buttonText = "Submit";
  showTableDataLoading = false;

  constructor(
    private commonSvc: CommonService,
    public apiSvc: ApiService,
    private alertSvc: AlertService,
    private fb: UntypedFormBuilder,
    private validator: FormValidationService
  ) {
    this.commonSvc.setTitle('Site Meta');
  }

  ngOnInit(): void {
    this.addNewMetaTypeValidator();
    //this.getFormData();
    this.getSiteMeta();
  }

  // getFormData() {
  //   this.apiSvc.get(AppConfig.apiUrl.getMetaType).subscribe((val: any) => {
  //     this.metaTypeDropdown = val?.data?.metaType || [];
  //   });
  // }

  addNewMetaTypeValidator() {
    const dep = this.myForm.controls['metaType'];
    const field = this.myForm.controls['newMetaType'];
    dep?.valueChanges.subscribe((val) => {
      if (val === '-1') {
        field.setValidators([Validators.required, this.validator.notEmpty]);
      } else {
        field.removeValidators([Validators.required, this.validator.notEmpty]);
        field.setValue(null);
        field.setErrors(null);
      }
    });
    field.updateValueAndValidity();
  }

  getSiteMeta() {
    let headers = new HttpHeaders();
    let params = new HttpParams();
    if (this.selectedMetaType) {
      params = params.append('selectedMetaType', this.selectedMetaType)
    }
    headers = headers.set('perPage', String(this.itemPerPage));
    headers = headers.set('page', String(this.currentPageIndex));
    this.showTableDataLoading = true;
    this.apiSvc.get(AppConfig.apiUrl.getSiteMeta, { headers: headers, params: params }).subscribe((response: any) => {
      this.totalRecords = response?.data['num_rows'];
      this.dataRow = response?.data['data_rows'];
      this.showTableDataLoading = false;
    });
  }

  metaKeyChange() {
    this.currentPageIndex = 0;
    this.first = 0;
    this.totalRecords = 0;
    this.itemPerPage = 30;
    this.getSiteMeta();
  }

  // editItem(data: any) {
  //   if (data.id) {
  //     this.mode = 'update';
  //     this.formTitle = "Edit Holiday";
  //     this.buttonText = "Update";
  //     this.myForm.patchValue({
  //       id: data?.id,
  //       action: 'edit',
  //       date: new Date(data?.holiday_date),
  //       occasion: data?.holiday_description,
  //       type: data?.holiday_type
  //     });
  //   }
  // }

  // deleteItem(data: any) {
  //   let queryParams = new HttpParams();
  //   if (data.id) {
  //     queryParams = queryParams.append('id', data.id);
  //   }
  //   let options = {};
  //   options = { params: queryParams };
  //   this.apiSvc.delete(AppConfig.apiUrl.deleteHoliday, options).subscribe({
  //     next: (response: any) => {
  //       this.setAddMode();
  //       this.alertSvc.setAlert('success', response.message);
  //       this.getSiteMeta();
  //     }
  //   });
  // }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.myForm.valid && this.myForm.get('action')?.value === 'add') {
      this.apiSvc.post(AppConfig.apiUrl.addSiteMeta, this.myForm.value).subscribe({
        next: (response: any) => {
          this.alertSvc.setAlert('success', response.message, true);
          this.getSiteMeta();
          this.setAddMode();
        },
        error: () => { this.loading = false; },
        complete: () => { this.loading = false; }
      });
    }
    else if (this.myForm.valid && this.myForm.get('action')?.value === 'edit' && this.myForm.get('id')?.value) {
      this.apiSvc.put(AppConfig.apiUrl.updateHoliday, this.myForm.value).subscribe({
        next: (response: any) => {
          this.alertSvc.setAlert('success', response.message, true);
          this.getSiteMeta();
          this.setAddMode();
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

  setAddMode() {
    this.formTitle = "Add Site Meta";
    this.buttonText = "Submit";
    this.mode = 'add';
    this.resetForm();
  }

  resetForm() {
    this.myForm.reset({
      id: null,
      action: 'add',
      metaKey: '',
      metaName: '',
      metaCode: '',
      metaStatus: '',
    });
  }
}
