import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { CommonService } from 'src/app/@core/services/common.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { AppConfig } from 'src/app/@utils/const/app.config';
import { addressType, userStatus } from 'src/app/@utils/const/data.array';

@Component({
  selector: 'app-insight-chart',
  templateUrl: './insight-chart.component.html',
  styleUrls: ['./insight-chart.component.scss']
})
export class InsightChartComponent {
  submitted = false;
  loading = false;
  routedFromPageIndex = 0;
  userId: any;
  userDetails: any;

  // donought chart
  doughnutChartData: any;
  doughnutChartOptions: any;
  doughnutChartLabel: any = [];
  doughnutChartValue: any = [];

  myForm = this.fb.group({
    action: ['generateChart'],
    entityId: [null, Validators.required],
    entityCode: [null, Validators.required],
    duration: ['last6months', [Validators.required]],
    //dateRange: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private commonSvc: CommonService,
    private apiSvc: ApiService,
    private alertSvc: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private validator: FormValidationService
  ) { 
    this.commonSvc.setTitle('Employee Insight');
  }

  ngOnInit(): void {
    this.routedFromPageIndex = history.state['manageUserPageIndex'] || 0;
    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = params.get('id');
      this.myForm.controls['entityId'].setValue(this.userId);
    });

    if (this.userId) {
      this.getChartData();
    }
  }

  onSubmit() {
    if (this.myForm.valid && this.userId) {
      this.getChartData();
    }
    else {
      this.loading = false;
      this.validator.validateAllFormFields(this.myForm);
    }
  }

  getChartData() {
    this.submitted = true;
    this.loading = true;
    this.doughnutChartLabel = [];
    this.doughnutChartValue = [];

    let queryParams = new HttpParams();
    queryParams = queryParams.append('id', this.userId);
    const options = { params: queryParams };

    let userDataAPI = this.apiSvc.get(AppConfig.apiUrl.userData, options);
    let userInsightAPI = this.apiSvc.post(AppConfig.apiUrl.userInsight, this.myForm.value);

    forkJoin([userDataAPI, userInsightAPI]).subscribe({
      next: (response: any) => {
        console.log(response[0]?.data?.user[0]);
        if (response[0]?.data?.user[0]) {
          this.userDetails = response[0]?.data?.user[0];
        }
        if (response[1]?.data.length > 0) {
          response[1]?.data.forEach((element: any) => {
            this.doughnutChartLabel.push(element.task_name + ' (' + element.sum_hours + ' hrs)');
            this.doughnutChartValue.push(element.sum_hours);
          });
          this.renderDoughnutChart();
        }
      },
      error: (response: HttpErrorResponse) => {
        this.loading = false;
      },
      complete: () => { this.loading = false; }
    });
  }

  renderDoughnutChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.doughnutChartData = {
      labels: this.doughnutChartLabel,
      datasets: [
        {
          data: this.doughnutChartValue,
          // backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
          // hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
        }
      ]
    };
    this.doughnutChartOptions = {
      cutout: '60%',
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      }
    };
  }
}
