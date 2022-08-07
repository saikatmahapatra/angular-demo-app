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
        window.scrollTo(0, 0);
        switch (message && message.type) {
          case 'success':
            message.cssClass = 'alert bg-success text-white';
            break;
          case 'error':
            message.cssClass = 'alert bg-danger text-white';
            break;
          case 'info':
            message.cssClass = 'alert bg-info text-white';
            break;
          case 'warning':
            message.cssClass = 'alert bg-warning text-white';
            break;
        }

        this.message = message;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
