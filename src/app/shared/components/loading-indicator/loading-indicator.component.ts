import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from '../../core/services/spinner.service';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss']
})
export class LoadingIndicatorComponent implements OnInit {

  showLoader = false;
  private subscription: Subscription = new Subscription;

  constructor(private spinnerSvc: SpinnerService) { }

  ngOnInit(): void {
    this.subscription = this.spinnerSvc.getAlert()
      .subscribe(data => {
        this.showLoader = data.showLoader;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
