import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Component({
    selector: 'app-transfer-fund',
    templateUrl: './transfer-fund.component.html',
    styleUrls: ['./transfer-fund.component.scss'],
    standalone: false
})
export class TransferFundComponent implements OnInit {

  someId: any;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // get query string param list
    this.route.queryParams.subscribe(params => {
      console.log('Getting queryParams =', params);
    });

    // get param map

    // this.someId = this.route.paramMap.pipe(
    //   switchMap(params => {
    //     return params.get('id');
    //   })
    // );

  }

}
