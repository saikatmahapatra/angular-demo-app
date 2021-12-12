import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private opened: boolean = true;
  private mediaWatcher: Subscription;
  //private menu: NavItem[] = menu;

  constructor(private media: MediaObserver, private alertService: AlertService) {
    this.mediaWatcher = this.media.media$.subscribe((mediaChange: MediaChange) => {
      this.handleMediaChange(mediaChange);
    })
  }
  ngOnInit(): void {
    this.alertService.error('This is sample alert message', false);
  }

  private handleMediaChange(mediaChange: MediaChange) {
    if (this.media.isActive('lt-md')) {
      this.opened = false;
    } else {
      this.opened = true;
    }
  }

  ngOnDestroy() {
    this.mediaWatcher.unsubscribe();
  }

}
