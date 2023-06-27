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
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  submitted = false;
  loading = false;
  routedFromPageIndex = 0;
  pageTitle = 'Analytics';
  rangeDates!: Date[];
  minDate!: Date;
  maxDate!: Date;

  // url
  entityId: any;
  entity: any;

  // entity specific
  projectInfoData: any;
  totalNumberOfEmployeesWorked: number = 0;
  totalHoursLogged: number = 0;
  totalNumberOfProjectsWorked: number = 0;
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

  // pie chart
  pieChartData: any;
  pieChartOptions: any;
  pieChartLabel: any = [];
  pieChartValue: any = [];

  myForm = this.fb.group({
    action: ['generateChart'],
    entityId: [null, Validators.required],
    entity: [null, Validators.required],
    duration: ['all', [Validators.required]],
    dateRange: ['']
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
    this.commonSvc.setTitle('Analytics');
    let today = new Date();
    this.maxDate = today;
    this.minDate = new Date('2018/01/01');
  }

  ngOnInit(): void {
    // if (this.router.url.indexOf('my-analytics') != -1) {
    //   this.pageTitle = 'Analytics';
    // }
    this.loading = false;
    this.dateRangeValidator();
    this.routedFromPageIndex = history.state['manageUserPageIndex'] || 0;
    this.activatedRoute.paramMap.subscribe(params => {
      this.entityId = params.get('entityId');
      this.entity = params.get('entity');
      this.myForm.controls['entityId'].setValue(this.entityId);
      this.myForm.controls['entity'].setValue(this.entity);
    });

    if (this.entity === 'emp' && this.entityId) {
      this.myForm.controls['duration'].setValue('last3months');
      this.getEmpChartData();
    }
    if (this.entity === 'project' && this.entityId) {
      this.myForm.controls['duration'].setValue('currentMonth');
      this.getProjectStatData();
    }
  }

  dateRangeValidator() {
    const dep = this.myForm.controls['duration'];
    const field = this.myForm.controls['dateRange'];
    dep?.valueChanges.subscribe((val) => {
      if (val === 'customDateRange') {
        field.setValidators([Validators.required]);
      } else {
        field.removeValidators([Validators.required]);
        field.setValue(null);
        field.setErrors(null);
      }
    });
    field.updateValueAndValidity();
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
    this.totalNumberOfEmployeesWorked = 0;
    this.totalHoursLogged = 0;

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
        let set: any = [];
        if (response[1]?.data.length > 0) {
          this.totalNumberOfEmployeesWorked = response[1]?.data.length || 0;
          response[1]?.data.forEach((element: any) => {
            if (!set.includes(element.task_id)) {
              set.push(element.task_name)
            }
            this.barChartDataLabel.push(element.user_full_name);
            this.barChartDataValue.push(element.logged_hours);
          });

          let hrsLogged = this.barChartDataValue.reduce((accumulator: number, currentValue: number) => {
            return (accumulator + Number(currentValue))
          }, 0);
          this.totalHoursLogged = hrsLogged.toFixed(2);
          this.renderBarChart();
        }

        if (response[1]?.taskData.length > 0) {
          response[1]?.taskData.forEach((element: any) => {
            this.doughnutChartLabel.push(element.task_name + ' (' + element.sum_hours + ' hrs)');
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

    this.pieChartLabel = [];
    this.pieChartValue = [];

    this.totalNumberOfProjectsWorked = 0;
    this.totalHoursLogged = 0;

    let queryParams = new HttpParams();
    queryParams = queryParams.append('id', this.entityId);
    const options = { params: queryParams };

    let userDataAPI = this.apiSvc.get(AppConfig.apiUrl.userData, options);
    let userAnalyticsAPI = this.apiSvc.post(AppConfig.apiUrl.userAnalytics, this.myForm.value);

    forkJoin([userDataAPI, userAnalyticsAPI]).subscribe({
      next: (response: any) => {
        //console.log(response[0]?.data?.user[0]);
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
        if (response[1]?.dataProject.length > 0) {
          this.totalNumberOfProjectsWorked = response[1]?.dataProject.length || 0;
          response[1]?.dataProject.forEach((element: any) => {
            this.pieChartLabel.push(element.project_name + ' (' + element.sum_hours + ' hrs)');
            this.pieChartValue.push(element.sum_hours);
          });
          let hrsLogged = this.pieChartValue.reduce((accumulator: number, currentValue: number) => {
            return (accumulator + Number(currentValue))
          }, 0);
          this.totalHoursLogged = hrsLogged.toFixed(2);
          this.renderPieChart();
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

  renderPieChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.pieChartData = {
      labels: this.pieChartLabel,
      datasets: [
        {
          data: this.pieChartValue,
          // backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
          // hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
        }
      ]
    };

    this.pieChartOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };
  }

}
