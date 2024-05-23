import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem, Message, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-prime-ng-ui-kit',
  templateUrl: './prime-ng-ui-kit.component.html',
  styleUrls: ['./prime-ng-ui-kit.component.scss'],
  providers: [MessageService]
})

export class PrimeNgUiKitComponent implements OnInit {

  checked = true;
  sliderVal: number = 30;
  ratingVal: number = 3;
  selectedRadio: string = 'R';
  selectedRadio2: string = '2';
  value17 = 10;
  expanded = true;
  optionCategoriesInline: any[] = [{ name: 'Option 1', key: 'A' }, { name: 'Option 2', key: 'M' }, { name: 'Option 3 (disabled)', key: 'R' }];
  optionCategoriesBlock: any[] = [{ name: 'Option 1', key: '1' }, { name: 'Option 2', key: '2' }, { name: 'Option 3 (disabled)', key: '3' }];
  selectedCheckboxCategories1: any[] = [{ name: 'Option 3 (disabled)', key: 'op3' }];
  selectedCheckboxCategories2: any[] = [{ name: 'Option 2', key: 'o2' }];
  selectedListboxOptions: any[] = [{ name: 'Option 1', code: 'opt1' }];
  checkboxCategoriesInline: any[] = [{ name: 'Option 1', key: 'op1' }, { name: 'Option 2', key: 'op2' }, { name: 'Option 3 (disabled)', key: 'op3' }];
  checkboxCategoriesBlock: any[] = [{ name: 'Option 1', key: 'o1' }, { name: 'Option 2', key: 'o2' }, { name: 'Option 3 (disabled)', key: 'o3' }];
  listboxOptions: any[] = [
    { name: 'Option 1', code: 'opt1' },
    { name: 'Option 2', code: 'opt2' },
    { name: 'Option 3', code: 'opt3' }
  ];

  cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
    { name: 'California', code: 'CAF' },
    { name: 'Ohio', code: 'OHI' },
    { name: 'Cosa', code: 'COS' },
    { name: 'Modoetia', code: 'MOD' }
  ];

  selectedCity1 = { name: 'Rome', code: 'RM' };
  selectedCities2 = '';
  activeItem = [];
  items = [];
  products: any = [
    {
      "id": "1000",
      "code": "f230fh0g3",
      "name": "Bamboo Watch",
      "description": "Product Description",
      "image": "bamboo-watch.jpg",
      "price": 65,
      "category": "Accessories",
      "quantity": 24,
      "inventoryStatus": "INSTOCK",
      "rating": 5
    },
    {
      "id": "1001",
      "code": "nvklal433",
      "name": "Black Watch",
      "description": "Product Description",
      "image": "black-watch.jpg",
      "price": 72,
      "category": "Accessories",
      "quantity": 61,
      "inventoryStatus": "INSTOCK",
      "rating": 4
    },
    {
      "id": "1002",
      "code": "zz21cz3c1",
      "name": "Blue Band",
      "description": "Product Description",
      "image": "blue-band.jpg",
      "price": 79,
      "category": "Fitness",
      "quantity": 2,
      "inventoryStatus": "LOWSTOCK",
      "rating": 3
    },
    {
      "id": "1003",
      "code": "244wgerg2",
      "name": "Blue T-Shirt",
      "description": "Product Description",
      "image": "blue-t-shirt.jpg",
      "price": 29,
      "category": "Clothing",
      "quantity": 25,
      "inventoryStatus": "INSTOCK",
      "rating": 5
    },
    {
      "id": "1004",
      "code": "h456wer53",
      "name": "Bracelet",
      "description": "Product Description",
      "image": "bracelet.jpg",
      "price": 15,
      "category": "Accessories",
      "quantity": 73,
      "inventoryStatus": "INSTOCK",
      "rating": 4
    },
    {
      "id": "1005",
      "code": "av2231fwg",
      "name": "Brown Purse",
      "description": "Product Description",
      "image": "brown-purse.jpg",
      "price": 120,
      "category": "Accessories",
      "quantity": 0,
      "inventoryStatus": "OUTOFSTOCK",
      "rating": 4
    },
    {
      "id": "1006",
      "code": "bib36pfvm",
      "name": "Chakra Bracelet",
      "description": "Product Description",
      "image": "chakra-bracelet.jpg",
      "price": 32,
      "category": "Accessories",
      "quantity": 5,
      "inventoryStatus": "LOWSTOCK",
      "rating": 3
    },
    {
      "id": "1007",
      "code": "mbvjkgip5",
      "name": "Galaxy Earrings",
      "description": "Product Description",
      "image": "galaxy-earrings.jpg",
      "price": 34,
      "category": "Accessories",
      "quantity": 23,
      "inventoryStatus": "INSTOCK",
      "rating": 5
    },
    {
      "id": "1008",
      "code": "vbb124btr",
      "name": "Game Controller",
      "description": "Product Description",
      "image": "game-controller.jpg",
      "price": 99,
      "category": "Electronics",
      "quantity": 2,
      "inventoryStatus": "LOWSTOCK",
      "rating": 4
    },
    {
      "id": "1009",
      "code": "cm230f032",
      "name": "Gaming Set",
      "description": "Product Description",
      "image": "gaming-set.jpg",
      "price": 299,
      "category": "Electronics",
      "quantity": 63,
      "inventoryStatus": "INSTOCK",
      "rating": 3
    }
  ];

  // Steps
  activeStepIndex: number = 0;
  steps: MenuItem[] = [];

  // file uploader related
  displayUploadModal = false;
  fileUploadEventObj: any
  disableFileUploader = false;
  disableManualFileUploadBtn = true;
  showUploadProgressLoader = false;
  @ViewChild('myFileUploader') myFileUploader!: FileUpload;
  fileHandlerMessages: Message[] = [];
  csvFileUploadLog: any = [];
  csvFileUploadMessage: Message[] = [];
  csvPayload: any = [];
  // file uploader related ends here

  serverSideMsg: Message[] = [];

  // Paginator config
  first: number = 10;
  rows: number = 10;
  page: number = 0;
  pageCount: number = 0;
  totalRecords: number = 120;
  rowsPerPageOptions = [10, 20, 30, 50];
  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }
  // Paginator config ends here

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    // Steps
    this.steps = [{
      label: 'Personal'
    },
    {
      label: 'Seat'
    },
    {
      label: 'Payment'
    },
    {
      label: 'Confirmation'
    }
    ];
    this.serverSideMsg = [
      { severity: 'success', summary: 'Success', detail: 'Message content' },
      { severity: 'info', summary: 'Info', detail: 'Message content' },
      { severity: 'warn', summary: 'Warning', detail: 'Message content' },
      { severity: 'error', summary: 'Error', detail: 'Message content' }
    ];
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }

  showInfo() {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content' });
  }

  showWarn() {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Message Content' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
  }

  openUploadModal() {
    this.removeClearFile();
    this.displayUploadModal = true;
    this.csvFileUploadLog = [];
    this.csvFileUploadMessage = [];
  }

  removeClearFile() {
    this.myFileUploader.clear();
    this.fileUploadEventObj = null;
    this.disableManualFileUploadBtn = true;
  }

  uploadHandler(fileUploadEvent: any) {
    this.fileUploadEventObj = fileUploadEvent;
    // Read CSV File and create payload
    if (this.fileUploadEventObj) {
      const file = this.fileUploadEventObj.files[0] as File;
      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        this.csvFileUploadLog = [];
        this.csvFileUploadMessage = [];
        const csv: any = reader.result;
        const csvData = csv.split('\n') || [];
        this.csvPayload = [];
        if (csvData.length > 0) {
          csvData.forEach((csvRow: string, index: number) => {
            if (csvRow.length > 0) {
              const csvRowData = csvRow.replace(/\;/g, ',').split('\,');
              if (csvRowData.length > 10) {
                this.csvFileUploadLog.push({ row: index + 1, detail: 'Count of max allowed columns exceeded.' });
              }
              // if (csvRowData.length > 5) {
              //   this.csvFileUploadLog.push({ row: index + 1, detail: 'Maximum 5 rows are allowed, found ' + csvRowData.length + ' rows.' });
              // }

              if (this.csvFileUploadLog.length == 0) {
                const payloadItem = {
                  groupName: csvRowData[2],
                  orderType: csvRowData[3],
                  discountCode: csvRowData[4],
                  pcc: csvRowData[5],
                  partNumber: csvRowData[6],
                  validityFromToc: csvRowData[7],
                  validityToToc: csvRowData[8],
                  discountToc: csvRowData[9].replace('\r', '')
                };
                this.csvPayload.push(payloadItem);
              }
            }
          });
          if (this.csvFileUploadLog.length == 0) {
            this.disableManualFileUploadBtn = false;
          }
        }
      }
    }
  }

  saveCSVData() {
    if (this.csvFileUploadLog.length == 0 && this.csvPayload.length > 0) {
      console.log("this.csvPayload==", this.csvPayload);
      this.showUploadProgressLoader = true;
      this.disableManualFileUploadBtn = true;
      //====== For fake API call time delay we are setting here timeout for demo, in your real code never use setTimeout
      setTimeout(() => {
        // if success or error stop showing loader
        this.showUploadProgressLoader = false;

        // on upload success/error clear object
        this.removeClearFile();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File has been uploaded successfully!' });
      }, 5000)
      //====== end of For fake API call time delay we are setting here timeout for demo, in your real code never use setTimeout
    }
  }

}
