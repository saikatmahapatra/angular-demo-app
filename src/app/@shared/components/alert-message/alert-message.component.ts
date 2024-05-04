import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../../../@core/services/alert.service';
import { Message, MessageService } from 'primeng/api';
@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss'],
  providers: [MessageService]
})
export class AlertMessageComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  messages!: Message[];
  constructor(private alertService: AlertService, private messageService: MessageService) { }

  ngOnInit() {
    this.subscription = this.alertService.getAlert()
      .subscribe(message => {
        window.scrollTo(0, 0);
        this.messages = [{ severity: message.type, summary: this.capitalizeFLetter(String(message.type)), detail: message.text }];
        //this.messageService.add({ severity: message.type, summary: message.type, detail: message.text });
      });
  }

  capitalizeFLetter(string: string) {
    return (string.charAt(0).toUpperCase() + string.slice(1));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
