import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit {

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.alertService.
  }

}
