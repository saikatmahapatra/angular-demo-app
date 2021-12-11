import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {

  private opened: boolean = true;
  private mediaWatcher: Subscription;
  //private menu: NavItem[] = menu;

  constructor(private media: MediaObserver) {
    this.mediaWatcher = this.media.media$.subscribe((mediaChange: MediaChange) => {
      this.handleMediaChange(mediaChange);
    })
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
