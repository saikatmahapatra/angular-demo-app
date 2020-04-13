import { Component, OnInit, ChangeDetectorRef, VERSION } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  version = VERSION;
}
