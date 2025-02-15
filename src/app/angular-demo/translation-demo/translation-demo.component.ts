import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { languageList } from 'src/app/@utils/const/language.list';

@Component({
    selector: 'app-translation-demo',
    templateUrl: './translation-demo.component.html',
    styleUrls: ['./translation-demo.component.scss'],
    standalone: false
})
export class TranslationDemoComponent implements OnInit {
  user!: { firstName: string; lastName: string; };
  pageContent!: any;
  welcome!: string;

  constructor(private tranlateSvc: TranslateService) {
  }

  ngOnInit(): void {
    // hardcoded example
    this.user = { firstName: 'Saikat', lastName: 'Mahapatra' };

    // synchronous. Also interpolate the 'firstName' parameter with a value.
    this.welcome = this.tranlateSvc.instant('welcomeMessage', { firstName: this.user.firstName });

    // asynchronous - gets translations then completes.
    this.tranlateSvc.get(['login'])
      .subscribe(data => {
        this.pageContent = data;
      });
  }
}
