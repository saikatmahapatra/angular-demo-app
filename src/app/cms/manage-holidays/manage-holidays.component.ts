import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { AppConfig } from 'src/app/@utils/const/app.config';

@Component({
  selector: 'app-manage-holidays',
  templateUrl: './manage-holidays.component.html',
  styleUrls: ['./manage-holidays.component.scss']
})
export class ManageHolidaysComponent implements OnInit {

  startYear: number = 2015;
  endYear: number = new Date().getFullYear() + 2;
  dataRow: any;
  selectedYear: number = new Date().getFullYear();
  yearList: any = [];
  // Pagination Config
  currentPageIndex: number = 0;
  totalRecords: number = 0;
  itemPerPage: number = 30;
  itemPerPageDropdown = [10, 20, 30, 50];
  paginate(event: any) {
    this.itemPerPage = event.rows;
    this.currentPageIndex = event.page;
    this.getHolidays();
  }
  // Pagination Config


  myForm = this.fb.group({
    id: [null],
    action: ['add'],
    date: ['', [Validators.required]],
    occasion: ['', [Validators.required]],
    type: ['', [Validators.required]]
  });
  submitted = false;
  loading = false;
  mode = 'add';
  formTitle = "Add Holiday";
  buttonText = "Submit";

  constructor(
    public apiSvc: ApiService,
    private alertSvc: AlertService,
    private fb: UntypedFormBuilder,
    private validator: FormValidationService
  ) {

  }

  ngOnInit(): void {
    for (let y = this.startYear; y <= this.endYear; y++) {
      this.yearList.push(y);
    }
    this.getHolidays();
  }

  getHolidays() {
    let headers = new HttpHeaders();
    let params = new HttpParams();
    if (this.selectedYear) {
      params = params.append('year', this.selectedYear)
    }
    headers = headers.set('perPage', String(this.itemPerPage));
    headers = headers.set('page', String(this.currentPageIndex));
    this.apiSvc.get(AppConfig.apiUrl.getHolidays, { headers: headers, params: params }).subscribe((response: any) => {
      this.totalRecords = response?.data['num_rows'];
      this.dataRow = response?.data['data_rows'];
    });
  }

  yearChange() {
    this.getHolidays();
  }

  editItem(data: any) {
    if (data.id) {
      this.mode = 'update';
      this.formTitle = "Edit Holiday";
      this.buttonText = "Update";
      this.myForm.patchValue({
        id: data?.id,
        action: 'edit',
        date: new Date(data?.holiday_date),
        occasion: data?.holiday_description,
        type: data?.holiday_type
      });
    }
  }

  deleteItem(data: any) {
    let queryParams = new HttpParams();
    if (data.id) {
      queryParams = queryParams.append('id', data.id);
    }
    let options = {};
    options = { params: queryParams };
    this.apiSvc.delete(AppConfig.apiUrl.deleteHoliday, options).subscribe({
      next: (response: any) => {
        this.setAddMode();
        this.alertSvc.success(response.message);
        this.getHolidays();
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.myForm.valid && this.myForm.get('action')?.value === 'add') {
      this.apiSvc.post(AppConfig.apiUrl.addHoliday, this.myForm.value).subscribe({
        next: (response: any) => {
          this.alertSvc.success(response.message, true);
          this.getHolidays();
          this.setAddMode();
        },
        error: () => { this.loading = false; },
        complete: () => { this.loading = false; }
      });
    }
    else if (this.myForm.valid && this.myForm.get('action')?.value === 'edit' && this.myForm.get('id')?.value) {
      this.apiSvc.put(AppConfig.apiUrl.updateHoliday, this.myForm.value).subscribe({
        next: (response: any) => {
          this.alertSvc.success(response.message, true);
          this.getHolidays();
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
    this.formTitle = "Add Holiday";
    this.buttonText = "Submit";
    this.mode = 'add';
    this.resetForm();
  }

  resetForm() {
    this.myForm.reset({
      id: null,
      action: 'add',
      date: '',
      occasion: '',
      type: ''
    });
  }

}
