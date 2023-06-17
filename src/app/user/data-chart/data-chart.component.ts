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
  
  myForm = this.fb.group({
    action: ['searchData'],
    fromToDate: ['', [Validators.required]]
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
  }

  onSubmit() {
    if (this.myForm.valid) {
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
    this.apiSvc.get(AppConfig.apiUrl.userDataChart, this.myForm.value).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: () => { this.loading = false; },
      complete: () => { this.loading = false; }
    });
  }
}
