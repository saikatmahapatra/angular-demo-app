import { Component, OnInit } from '@angular/core';
import { CommonService } from '../@core/services/common.service';

@Component({
  selector: 'app-cms-layout',
  templateUrl: './cms-layout.component.html',
  styleUrls: ['./cms-layout.component.scss']
})
export class CmsLayoutComponent implements OnInit {

  constructor(private commonSvc: CommonService) { 
    this.commonSvc.setTitle('CMS');
    
  }

  ngOnInit(): void {
  }

}
