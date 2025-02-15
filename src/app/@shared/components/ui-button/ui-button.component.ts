import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-ui-button',
    templateUrl: './ui-button.component.html',
    styleUrls: ['./ui-button.component.scss'],
    standalone: false
})
export class UiButtonComponent implements OnInit {

  // @Input() btnType: string | undefined;
  // @Input() uiStyle: Object | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
