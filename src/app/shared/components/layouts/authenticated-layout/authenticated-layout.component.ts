import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavItem } from '../../../utils/ui/model/nav-item';
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import { Subscription } from 'rxjs';
import { menu } from '../../../utils/ui/model/menu';

@Component({
  selector: 'app-authenticated-layout',
  templateUrl: './authenticated-layout.component.html',
  styleUrls: ['./authenticated-layout.component.scss']
})
export class AuthenticatedLayoutComponent implements OnDestroy {

  opened: boolean = true;
  mediaWatcher: Subscription;
  menu: NavItem[] = menu;

  constructor(private media: MediaObserver) {
    this.mediaWatcher = this.media.media$.subscribe((mediaChange: MediaChange) => {
      this.handleMediaChange(mediaChange);
    })
  }

  handleMediaChange(mediaChange: MediaChange) {
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
