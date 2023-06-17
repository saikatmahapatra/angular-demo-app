import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApiService } from 'src/app/@core/services/api.service';
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
    private router: Router
    ) { }

  ngOnInit(): void {
    this.routedFromPageIndex = history.state['manageUserPageIndex'] || 0;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    console.log(this.myForm.value);
    // if (this.approvers.length > 0 && this.myForm.valid && this.myForm.get('action')?.value === 'applyLeave') {
    //   this.apiSvc.post(AppConfig.apiUrl.applyLeave, this.myForm.value).subscribe({
    //     next: (response: any) => {
    //       this.alertSvc.success(response.message, true);
    //       this.resetFormValue();
    //       this.router.navigate(['/leave/history']);
    //     },
    //     error: () => { this.loading = false; },
    //     complete: () => { this.loading = false; }
    //   });
    // }
    // else {
    //   this.loading = false;
    //   this.validator.validateAllFormFields(this.myForm);
    // }
  }
}
