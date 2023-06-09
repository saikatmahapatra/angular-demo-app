import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { AuthService } from 'src/app/@core/services/auth.service';
import { ExcelService } from 'src/app/@core/services/excel.service';
import { ExportExcelService } from 'src/app/@core/services/export-excel.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { AppConfig } from 'src/app/@utils/const/app.config';


@Component({
  selector: 'app-timesheet-report',
  templateUrl: './timesheet-report.component.html',
  styleUrls: ['./timesheet-report.component.scss']
})
export class TimesheetReportComponent implements OnInit {
  rangeDates!: Date[];
  minDate!: Date;
  maxDate!: Date;
  userList: any[] = [];
  projectList: any[] = [];
  selectedEmployees = [];
  selectedProjects = [];
  loading = false;
  timesheetData: any = [];
  dataForExcel: any = [];
  showTableDataLoading = false;

  myForm = this.fb.group({
    action: ['timesheetReport'],
    dateRange: [null],
    employee: [null],
    projects: [null]
  });

  // Pagination Config
  currentPageIndex: number = 0;
  first: number = 0;
  totalRecords: number = 0;
  itemPerPage: number = 100;
  itemPerPageDropdown = [10, 20, 30, 50, 100, 500];
  paginate(event: any) {
    this.itemPerPage = event.rows;
    this.currentPageIndex = event.page;
    this.getTimesheetData();
  }
  // Pagination Config

  constructor(
    private apiSvc: ApiService,
    private authSvc: AuthService,
    private alertSvc: AlertService,
    private router: Router,
    private fb: UntypedFormBuilder,
    private validator: FormValidationService,
    private exportSvc: ExportExcelService,
    private excelService: ExcelService
  ) {
    let today = new Date();
    this.maxDate = today;
  }

  ngOnInit(): void {
    this.getUserDropdown();
    this.getProjectDropdown();
    this.getTimesheetData();
  }

  getUserDropdown() {
    this.apiSvc.get(AppConfig.apiUrl.userDropdown).subscribe({
      next: (response: any) => {
        this.userList = response?.data;
      }
    });
  }

  getProjectDropdown() {
    this.apiSvc.get(AppConfig.apiUrl.projectDropdown).subscribe({
      next: (response: any) => {
        this.projectList = response?.data;
      }
    });
  }

  onSubmit() {
    this.timesheetData = [];
    if (this.myForm.valid && this.myForm.get('action')?.value === 'timesheetReport') {
      this.getTimesheetData();
    }
    else {
      this.loading = false;
      this.validator.validateAllFormFields(this.myForm);
    }
  }

  getTimesheetData() {
    let headers = new HttpHeaders();
    headers = headers.set('perPage', String(this.itemPerPage));
    headers = headers.set('page', String(this.currentPageIndex));
    this.showTableDataLoading = true;
    this.apiSvc.post(AppConfig.apiUrl.timesheetReport, this.myForm.value, { headers: headers }).subscribe({
      next: (response: any) => {
        this.dataForExcel = [];
        this.timesheetData = response?.data?.data_rows;
        this.totalRecords = response?.data?.num_rows;
        this.showTableDataLoading = false;
      },
      error: () => { this.loading = false; this.showTableDataLoading = false; },
      complete: () => { this.loading = false; this.showTableDataLoading = false; }
    });
  }

  exportToExcelX() {
    this.timesheetData.forEach((row: any) => {
      let key = Object.keys(row);
      this.dataForExcel.push(Object.values(row))
    })

    let reportData = {
      title: 'Timesheet Report',
      data: this.dataForExcel,
      //headers: Object.keys(this.timesheetData[0]),
      headers: ['ID', 'DATE', 'HOURS', 'DESCRIPTION', 'CREATED_ON', 'UPDATED_ON', 'STATUS', 'REVIEWED_BY', 'REVIEWED_ON', 'PROJECT_NO', 'PROJECT_NAME', 'TASK_NAME', 'EMP_NAME', 'REVIEWER_NAME'],
      sheetName: 'Data'
    }
    this.exportSvc.exportTimesheetExcel(reportData);
  }

  exportToExcel() {
    const fileToExport = this.timesheetData.map((item: any) => {
      return {
        "ID": item?.id,
        "TIMESHEET DATE": item?.timesheet_date,
        "EMPLOYEE NAME": item?.user_full_name,
        "PROJECT NAME": item?.project_name + ' '+item?.project_number,
        "TASK NAME": item?.task_name,
        "DESCRIPTION": item?.timesheet_description || '-',
        "LOGGED HOURS": item?.timesheet_hours,
        "LOGEED ON": item?.timesheet_created_on,
        "UPDATED ON": item?.timesheet_updated_on || '-'
      }
    });
    this.excelService.exportToExcel(
      fileToExport,
      'Timesheet-Report-' + new Date().getTime() + '.xlsx'
    );
  }

  resetForm() {
    this.myForm.reset({
      action: 'timesheetReport',
      dateRange: null,
      employee: null,
      projects: null
    });
    this.getTimesheetData();
  }

}


