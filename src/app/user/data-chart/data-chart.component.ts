import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { FormValidationService } from 'src/app/@core/services/form-validation.service';
import { AppConfig } from 'src/app/@utils/const/app.config';
import { addressType, userStatus } from 'src/app/@utils/const/data.array';

@Component({
  selector: 'app-data-chart',
  templateUrl: './data-chart.component.html',
  styleUrls: ['./data-chart.component.scss']
})
export class DataChartComponent implements OnInit {
  submitted = false;
  loading = false;
  routedFromPageIndex = 0;
  userId: any;

  // donought chart
  doughnutChartData: any;
  doughnutChartOptions: any;
  doughnutChartLabel: any = [];
  doughnutChartValue: any = [];
  
  myForm = this.fb.group({
    action: ['searchData'],
    userId: [null, Validators.required],
    dateRange: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private apiSvc: ApiService, 
    private alertSvc: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private validator: FormValidationService
    ) { }

  ngOnInit(): void {
    this.routedFromPageIndex = history.state['manageUserPageIndex'] || 0;
    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = params.get('id');
      this.myForm.controls['userId'].setValue(this.userId);
    });

    if(this.userId) {
      this.getChartData();
    }
  }

  onSubmit() {
    if (this.myForm.valid && this.userId) {
      this.doughnutChartLabel = [];
      this.doughnutChartValue = [];
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
    this.apiSvc.post(AppConfig.apiUrl.userDataChart, this.myForm.value).subscribe({
      next: (response: any) => {
        if (response?.data.length > 0) {
          response?.data.forEach((element: any) => {
            this.doughnutChartLabel.push(element.task_name+ ' ('+element.sum_hours+' hrs)');
            this.doughnutChartValue.push(element.sum_hours);
          });
          this.renderDoughnutChart();
        }
      },
      error: () => { this.loading = false; },
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
