import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { languageList } from 'src/app/@utils/const/language.list';
@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrl: './language-switch.component.scss'
})
export class LanguageSwitchComponent implements OnInit {
  @Input() showBtnIcon = true;
  @Input() showBtnText = false;
  @Input() showTooltip = true;
  @Input() iconClass = '';
  @Input() textClass = '';
  userSelectedLang: string = localStorage.getItem('appLang') || 'en_US';
  languageList: Array<string> = [];

  constructor(private tranlateSvc: TranslateService) {
    this.languageList = languageList;
    this.tranlateSvc.addLangs(this.languageList);
    const allowedLanguageList = this.tranlateSvc.getLangs();
    if (allowedLanguageList.includes(this.userSelectedLang)) {
      this.tranlateSvc.use(this.userSelectedLang);
    }
  }

  ngOnInit() {

  }

  changeLanguage(lang: string) {
    if (lang) {
      localStorage.setItem('appLang', lang);
      this.tranlateSvc.use(lang);
    }
  }
}
