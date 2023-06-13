import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ApiService } from 'src/app/@core/services/api.service';
import { AppConfig } from 'src/app/@utils/const/app.config';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {
  data: any;
  options: any;
  projectInfoData: any;
  projectId!: number | any;
  chartDataLabel: any = [];
  chartDataValue: any = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiSvc: ApiService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.projectId = params.get('projectId');
    });
    if (this.projectId) {
      this.getStatData();
    }
  }

  renderBarChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: this.chartDataLabel,
      datasets: [
        {
          label: 'Logged Hours',
          backgroundColor: documentStyle.getPropertyValue('--pink-500'),
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          data: this.chartDataValue
        }
      ]
    };

    this.options = {
      indexAxis: 'y',
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

  getStatData() {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('id', this.projectId);
    const options = { params: queryParams };

    let projectDetailsAPI = this.apiSvc.get(AppConfig.apiUrl.getProject, options);
    let analyticsDataAPI = this.apiSvc.get(AppConfig.apiUrl.getBarChartData, options);

    forkJoin([projectDetailsAPI, analyticsDataAPI]).subscribe({
      next: (response: any) => {
        // project info
        this.projectInfoData = response[0]?.data?.data_rows ? response[0]?.data?.data_rows[0] : {};
        // worklog info
        if (response[1]?.data.length > 0) {
          response[1]?.data.forEach((element: any) => {
            this.chartDataLabel.push(element.user_full_name);
            this.chartDataValue.push(element.logged_hours);
          });
          this.renderBarChart();
        }

      },
      error: (response: HttpErrorResponse) => {
      }
    });
  }
}
