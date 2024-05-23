import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { languageList } from 'src/app/@utils/const/language.list';

@Component({
  selector: 'app-translation-demo',
  templateUrl: './translation-demo.component.html',
  styleUrls: ['./translation-demo.component.scss']
})
export class TranslationDemoComponent implements OnInit {
  user!: { firstName: string; lastName: string; };
  welcome!: string;
  usernameLabel!: string;
  passwordLabel!: string;
  availableLanguageList!: Array<string>;
  selectedLang: string = localStorage.getItem('appLang') || 'en_US';

  constructor(private tranlateSvc: TranslateService) { 
    tranlateSvc.addLangs(languageList);
    this.availableLanguageList = this.tranlateSvc.getLangs();
    tranlateSvc.setDefaultLang('en_US');
    if(this.availableLanguageList.includes(this.selectedLang)) {
      tranlateSvc.use(this.selectedLang);
    }
  }

  ngOnInit(): void {
    // hardcoded example
    this.user = { firstName: 'Saikat', lastName: 'Mahapatra' };

    // synchronous. Also interpolate the 'firstName' parameter with a value.
    this.welcome = this.tranlateSvc.instant('welcomeMessage', { firstName: this.user.firstName });

    // asynchronous - gets translations then completes.
    this.tranlateSvc.get(['login'])
      .subscribe(data => {
        this.usernameLabel = data['login.username'];
        this.passwordLabel = data['login.password'];
      });
  }

  languageSwitch(event: any) {
    if(event.target.value) {
      localStorage.setItem('appLang', event.target.value);
      window.location.reload();
    }
  }

}
