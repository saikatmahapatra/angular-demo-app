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
    private excelService: ExcelService
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
    const fileToExport = this.dataRow.map((item: any) => {
      return {
        "EMP_ID": item?.user_id,
        "EMPLOYEE_NAME": item?.user_full_name,
        "CL": item?.cl || 0.00,
        "SL": item?.sl || 0.00,
        "PL": item?.pl || 0.00,
        "OL": item?.ol || 0.00,
        "CO": item?.co || 0.00
      }
    });
    this.excelService.exportToExcel(
      fileToExport,
      'Leave-Balance-Template-' + new Date().getTime() + '.xlsx'
    );
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
