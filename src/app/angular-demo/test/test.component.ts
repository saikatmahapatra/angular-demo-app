import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewEncapsulation, Input, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ContentCardComponent } from '../content-card/content-card.component';
import { ExcelService } from 'src/app/@core/services/excel.service';
@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss'],
    standalone: false
})
export class TestComponent implements OnInit, AfterViewInit {

  @Input()
  showShubhead: boolean = false;
  routeData: any;
  msg = '';


  dataForExcel: any = [];

  empPerformance = [
    { ID: 10011, NAME: "A", DEPARTMENT: "Sales", MONTH: "Jan", YEAR: 2020, SALES: 132412, CHANGE: 12, LEADS: 35 },
    { ID: 10012, NAME: "A", DEPARTMENT: "Sales", MONTH: "Feb", YEAR: 2020, SALES: 232324, CHANGE: 2, LEADS: 443 },
    { ID: 10013, NAME: "A", DEPARTMENT: "Sales", MONTH: "Mar", YEAR: 2020, SALES: 542234, CHANGE: 45, LEADS: 345 },
    { ID: 10014, NAME: "A", DEPARTMENT: "Sales", MONTH: "Apr", YEAR: 2020, SALES: 223335, CHANGE: 32, LEADS: 234 },
    { ID: 10015, NAME: "A", DEPARTMENT: "Sales", MONTH: "May", YEAR: 2020, SALES: 455535, CHANGE: 21, LEADS: 12 },
  ];


  @ViewChild(ContentCardComponent)
  private contentCC !: ContentCardComponent;

  @ViewChildren(ContentCardComponent)
  private childrenContentCard!: QueryList<ContentCardComponent>;

  constructor(
    private route: ActivatedRoute, 
    private cd : ChangeDetectorRef,
    private excelService: ExcelService
    ) { 

  }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      console.log('====>ActivatedRoute=====>', data);
    })
    this.msg = 'ngOnInit called from test.component.ts';
  }

  ngAfterViewInit() {
    console.log('ViewChild of ContentCardComponent ', this.contentCC);
    console.log('View Children of ContentCardComponent', this.childrenContentCard);

    //ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: 'ngOnInit called from test.component.ts
    //this.contentCC.message = 'I am a JS developer';
    // This can be fixed by 2 way
    // 1. Chnage this message in ngAfterContentInit
    // 2. manually call chnageDetectoreRef
    this.cd.detectChanges();
  }

  exportToExcel() {
    const fileToExport = this.empPerformance.map((item: any) => {
      return {
        "ID": item?.ID,
        "NAME": item?.NAME,
        "DEPT": item?.DEPARTMENT
      }
    });
    this.excelService.exportToExcel(fileToExport, 'MyFile-' + new Date().getTime());
  }
}
