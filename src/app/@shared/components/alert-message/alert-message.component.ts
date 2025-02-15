import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../../../@core/services/alert.service';
import { Message, MessageService } from 'primeng/api';
@Component({
    selector: 'app-alert-message',
    templateUrl: './alert-message.component.html',
    styleUrls: ['./alert-message.component.scss'],
    providers: [MessageService],
    standalone: false
})
export class AlertMessageComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  messages: Message[] = [];
  messageSummary: any = {
    success: "Success",
    error: "Error",
    warning: "Warning",
    info: "Info"
  };
  constructor(private alertService: AlertService, private messageService: MessageService) { }

  ngOnInit() {
    this.subscription = this.alertService.getAlert()
      .subscribe(message => {
        if (message.severity) {
          // messages
          this.messages = [{ severity: message.severity, summary: this.messageSummary[message.summary], detail: message.text }];
          // toast message
          this.messageService.add({ severity: message.severity, summary: this.messageSummary[message.summary], detail: message.text });
        } else {
          this.messages = [];
          this.messageService.clear();
          //this.messageService.clear();
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
