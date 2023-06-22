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

@Component({
  selector: 'app-insight-chart',
  templateUrl: './insight-chart.component.html',
  styleUrls: ['./insight-chart.component.scss']
})
export class InsightChartComponent implements OnInit {
  submitted = false;
  loading = false;
  routedFromPageIndex = 0;

  // url
  entityId: any;
  entity: any;

  // entity specific
  projectInfoData: any;
  totalWorkforce: number = 0;
  totalBurnedHours: number = 0;
  userDetails: any;

  // common bar chart
  barChartData: any;
  barChartOptions: any;
  barChartDataLabel: any = [];
  barChartDataValue: any = [];

  // common donought chart
  doughnutChartData: any;
  doughnutChartOptions: any;
  doughnutChartLabel: any = [];
  doughnutChartValue: any = [];

  myForm = this.fb.group({
    action: ['generateChart'],
    entityId: [null, Validators.required],
    entity: [null, Validators.required],
    duration: ['all', [Validators.required]],
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
    this.commonSvc.setTitle('Insight Dashboard');
  }

  ngOnInit(): void {
    this.routedFromPageIndex = history.state['manageUserPageIndex'] || 0;
    this.activatedRoute.paramMap.subscribe(params => {
      this.entityId = params.get('entityId');
      this.entity = params.get('entity');
      this.myForm.controls['entityId'].setValue(this.entityId);
      this.myForm.controls['entity'].setValue(this.entity);
    });

    if (this.entity === 'emp' && this.entityId) {
      this.myForm.controls['duration'].setValue('all');
      this.getEmpChartData();
    }
    if (this.entity === 'project' && this.entityId) {
      this.myForm.controls['duration'].setValue('currentMonth');
      this.getProjectStatData();
    }
  }

  onSubmit() {
    if (this.myForm.valid && this.entity === 'emp' && this.entityId) {
      this.getEmpChartData();
    }
    if (this.myForm.valid && this.entity === 'project' && this.entityId) {
      this.getProjectStatData();
    }
    else {
      this.loading = false;
      this.validator.validateAllFormFields(this.myForm);
    }
  }

  getProjectStatData() {
    this.doughnutChartLabel = [];
    this.doughnutChartValue = [];
    this.barChartDataLabel = [];
    this.barChartDataValue = [];
    //this.projectInfoData = {};
    this.totalWorkforce = 0;
    this.totalBurnedHours = 0;

    let queryParams = new HttpParams();
    queryParams = queryParams.append('id', this.entityId);
    const options = { params: queryParams };

    let projectDetailsAPI = this.apiSvc.get(AppConfig.apiUrl.getProject, options);
    let analyticsDataAPI = this.apiSvc.post(AppConfig.apiUrl.timesheetChartData, this.myForm.value);
    forkJoin([projectDetailsAPI, analyticsDataAPI]).subscribe({
      next: (response: any) => {
        // project info
        this.projectInfoData = response[0]?.data?.data_rows ? response[0]?.data?.data_rows[0] : {};
        // worklog info
        let set : any= [];
        if (response[1]?.data.length > 0) {
          this.totalWorkforce = response[1]?.data.length || 0;
          response[1]?.data.forEach((element: any) => {
            if(!set.includes(element.task_id)) {
              set.push(element.task_name)
            }
            this.barChartDataLabel.push(element.user_full_name);
            this.barChartDataValue.push(element.logged_hours);
          });

          let totalBurnedHours = this.barChartDataValue.reduce((accumulator: number, currentValue: number) => {
            return (accumulator + Number(currentValue))
          },0);
          this.totalBurnedHours = totalBurnedHours.toFixed(2);
          this.renderBarChart();
        }

        if (response[1]?.taskData.length > 0) {
          response[1]?.taskData.forEach((element: any) => {
            this.doughnutChartLabel.push(element.task_name+' ('+element.sum_hours+' hrs)');
            this.doughnutChartValue.push(element.sum_hours);
          });
          this.renderDoughnutChart();
        }

      },
      error: (response: HttpErrorResponse) => {
      }
    });
  }

  getEmpChartData() {
    this.submitted = true;
    this.loading = true;
    this.doughnutChartLabel = [];
    this.doughnutChartValue = [];

    let queryParams = new HttpParams();
    queryParams = queryParams.append('id', this.entityId);
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

  renderBarChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.barChartData = {
      labels: this.barChartDataLabel,
      datasets: [
        {
          label: 'Logged Hours',
          backgroundColor: documentStyle.getPropertyValue('--blue-400'),
          borderColor: documentStyle.getPropertyValue('--blue-400'),
          data: this.barChartDataValue
        }
      ]
    };

    this.barChartOptions = {
      indexAxis: 'x',
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
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
