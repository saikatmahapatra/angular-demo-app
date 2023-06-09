import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { AppConfig } from 'src/app/@utils/const/app.config';
//import { MessageService } from 'primeng/api';
import { ExportExcelService } from 'src/app/@core/services/export-excel.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-leave-balance-calculation',
  templateUrl: './leave-balance-calculation.component.html',
  styleUrls: ['./leave-balance-calculation.component.scss']
})
export class LeaveBalanceCalculationComponent implements OnInit {

  dataRow = [];
  loading = false;
  dataForExcel: any = [];
  leaveBalJson !: string;

  // Pagination Config
  currentPageIndex: number = 0;
  first: number = 0;
  totalRecords: number = 0;
  itemPerPage: number = 50;
  itemPerPageDropdown = [50, 100];
  paginate(event: any) {
    this.itemPerPage = event.rows;
    this.currentPageIndex = event.page;
    this.getLeaveBalance();
  }
  // Pagination Config
  constructor(
    private apiSvc: ApiService,
    private router: Router,
    private exportSvc: ExportExcelService
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
        this.loading = false;
        this.dataRow = response?.data?.data_rows || [];
        this.totalRecords = response?.data?.num_rows || 0;
      },
      error: () => { this.loading = false; },
      complete: () => { this.loading = false; }
    })
  }

  editUserProfile(id: number) {
    this.router.navigate(['/emp/edit', id]);
  }

  exportToExcel() {
    
    this.dataRow.forEach((row: any) => {
      //let key = Object.keys(row);
      const rowObj = {
        id: row?.user_id,
        name: row?.user_full_name,
        cl: row?.cl,
        sl: row?.sl,
        pl: row?.pl,
        ol: row?.ol,
        co: row?.co
      };
      this.dataForExcel.push(Object.values(rowObj))
    })

    let reportData = {
      title: 'Emp_Leave_Balance',
      data: this.dataForExcel,
      //headers: Object.keys(this.dataRow[0]),
      headers: ['ID', 'EMPLOYEE_NAME', 'CL', 'SL', 'PL', 'OL', 'CO'],
      sheetName: 'Data'
    }
    this.exportSvc.exportLeaveBalanceExcel(reportData);
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
      console.log(workbook);
      workbook.SheetNames.forEach(sheet=> {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        console.log(data);
      })
    }
  }
}
