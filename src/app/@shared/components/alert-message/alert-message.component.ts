import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../../../@core/services/alert.service';
@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  message: any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.subscription = this.alertService.getAlert()
      .subscribe(message => {
        //window.scrollTo(0, 0);
        switch (message && message.type) {
          case 'success':
            message.cssClass = 'alert-success';
            message.icon = 'success';
            break;
          case 'error':
            message.cssClass = 'alert-danger';
            message.icon = 'error';
            break;
          case 'info':
            message.cssClass = 'alert-info';
            message.icon = 'info';
            break;
          case 'warning':
            message.cssClass = 'alert-warning';
            message.icon = 'warning';
            break;
        }

        this.message = message;
        // setTimeout(() => {
        //   this.dismissAlert()
        // }, 8000)
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  dismissAlert() {
    this.message = {};
  }
}
