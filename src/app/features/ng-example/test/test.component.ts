import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./a.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class TestComponent implements OnInit {

  @Input()
  showShubhead: boolean = false;
  routeData: any;
  constructor(private route: ActivatedRoute) { 

  }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      console.log('====>ActivatedRoute=====>', data);
    })
  }

}
