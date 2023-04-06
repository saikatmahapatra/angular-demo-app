import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';

@Component({
  selector: 'app-manage-leave',
  templateUrl: './manage-leave.component.html',
  styleUrls: ['./manage-leave.component.scss']
})
export class ManageLeaveComponent implements OnInit {
  dataRow = [];
  loading = false;
  submitted = false;
  // Pagination Config
  currentPageIndex: number = 0;
  totalRecords: number = 0;
  itemPerPage: number = 30;
  itemPerPageDropdown = [10, 20, 30, 50];
  paginate(event: any) {
    this.itemPerPage = event.rows;
    this.currentPageIndex = event.page;
  }
  // Pagination Config

  searchForm = this.fb.group({
    fromDate: [new Date(), Validators.required],
    toDate: [new Date(), Validators.required],
    leaveStatus: ['', Validators.required]
  });

  leaveStatus: any[]= [
    {value: 'A', text: 'Applied'},
    {value: 'B', text: 'Pending'}
  ]

  constructor(
    private fb: FormBuilder,
    private alertSvc: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    
  }

}
