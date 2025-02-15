import { Component, OnInit } from '@angular/core';
import { CommonService } from '../@core/services/common.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styles: [],
    standalone: false
})
export class UserComponent implements OnInit {

  constructor(private commonSvc: CommonService) { 
    this.commonSvc.setTitle('Employee');
    
  }

  ngOnInit() {
  }

}
