import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
const EXCEL_EXTENSION = '.xlsx'; // excel file extension
@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  exportToExcel(element: any, fileName: string): void {
    // generate workbook and add the worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(element);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // save to file
    XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');
    XLSX.writeFile(workbook, `${fileName}${EXCEL_EXTENSION }`);
  }
}
