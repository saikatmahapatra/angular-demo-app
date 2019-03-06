import { Component, OnInit, AfterViewInit, ViewChild, VERSION } from '@angular/core';

@Component({
  selector: 'app-default-footer',
  templateUrl: './default-footer.component.html',
  styleUrls: ['./default-footer.component.scss']
})
export class DefaultFooterComponent implements OnInit {
  version = VERSION;
  constructor() { }

  ngOnInit() {
  }

}
