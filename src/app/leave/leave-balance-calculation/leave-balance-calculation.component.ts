import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { ExcelService } from 'src/app/@core/services/excel.service';
import { AppConfig } from 'src/app/@utils/const/app.config';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-leave-balance-calculation',
  templateUrl: './leave-balance-calculation.component.html',
  styleUrls: ['./leave-balance-calculation.component.scss']
})
export class LeaveBalanceCalculationComponent implements OnInit {

  dataRow = [];
  showTableDataLoading = false;
  dataForExcel: any = [];
  leaveBalJson !: string;
  postData: any = [];

  // Pagination Config
  currentPageIndex: number = 0;
  first: number = 0;
  totalRecords: number = 0;
  itemPerPage: number = 100;
  itemPerPageDropdown = [100];
  paginate(event: any) {
    this.itemPerPage = event.rows;
    this.currentPageIndex = event.page;
    this.getLeaveBalance();
  }
  // Pagination Config
  constructor(
    private apiSvc: ApiService,
    private router: Router,
    private excelService: ExcelService,
    private alertSvc: AlertService
  ) { }

  ngOnInit(): void {
    this.getLeaveBalance();
  }

  getLeaveBalance() {
    let headers = new HttpHeaders();
    let params = new HttpParams();
    headers = headers.set('perPage', String(this.itemPerPage));
    headers = headers.set('page', String(this.currentPageIndex));
    this.apiSvc.get(AppConfig.apiUrl.getEmpLeaveBalance, { headers: headers }).subscribe({
      next: (response: any) => {
        //console.log(response);
        this.dataForExcel = [];
        this.showTableDataLoading = false;
        this.dataRow = response?.data?.data_rows || [];
        this.totalRecords = response?.data?.num_rows || 0;
      },
      error: () => { this.showTableDataLoading = false; },
      complete: () => { this.showTableDataLoading = false; }
    })
  }

  editUserProfile(id: number) {
    this.router.navigate(['/emp/edit', id]);
  }

  exportToExcel() {
    const fileToExport = this.dataRow.map((item: any) => {
      return {
        "UID": item?.user_id || '-',
        "EMPLOYEE_NAME": item?.user_full_name || '-',
        "CL": item?.cl || 0,
        "SL": item?.sl || 0,
        "PL": item?.pl || 0,
        "OL": item?.ol || 0,
        "CO": item?.co || 0,
        "BULK_UPDATED_ON": item?.leave_balance_bulk_updated_on || '-'
      }
    });
    this.excelService.exportToExcel(fileToExport, 'Leave-Balance-Template');
  }

  onUpload(event: any) {
    console.log(event);
  }

  onSelect(event: any) {
    const selectedFile = event.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event: any) => {
      console.log(event);
      let binaryData = event.target.result;
      let workbook = XLSX.read(binaryData, {type: 'binary'});
      workbook.SheetNames.forEach(sheet=> {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        this.postData = data;
      });
      // call API
      if(this.postData.length > 0) {
        const postData = {'action': 'updateBatch', 'leaveBalance': this.postData};
        this.apiSvc.post(AppConfig.apiUrl.uploadLeaveData, postData).subscribe({
          next: (response: any) => {
            this.alertSvc.success(response.message);
            this.postData = [];
            this.getLeaveBalance();
          },
          error: () => { 
            this.showTableDataLoading = false; 
            this.postData = [];
          },
          complete: () => { 
            this.showTableDataLoading = false; 
            this.postData = [];
          }
        })
      }
    }
  }
}
