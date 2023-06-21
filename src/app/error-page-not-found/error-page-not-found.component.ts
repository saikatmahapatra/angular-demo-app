import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../@core/services/common.service';

@Component({
  selector: 'app-error-page-not-found',
  templateUrl: './error-page-not-found.component.html',
  styleUrls: ['./error-page-not-found.component.scss']
})
export class ErrorPageNotFoundComponent implements OnInit {

  constructor(
    private commonSvc: CommonService,
    private router: Router) {
    this.commonSvc.setTitle('Page Not Found');
  }

  ngOnInit() {

  }

  goToHome() {
    this.router.navigate(['/dashboard']);
  }
}
