import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/@core/services/common.service';

@Component({
  selector: 'app-view-hr-policies',
  templateUrl: './view-hr-policies.component.html',
  styleUrls: ['./view-hr-policies.component.scss']
})
export class ViewHrPoliciesComponent implements OnInit {

  constructor(private commonSvc: CommonService) { 
    this.commonSvc.setTitle('HR Policies');
  }

  ngOnInit(): void {
  }

}
