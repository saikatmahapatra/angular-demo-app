import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./a.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class TestComponent implements OnInit {

  @Input() showShubhead: boolean;
  constructor() { }

  ngOnInit() {
  }

}
