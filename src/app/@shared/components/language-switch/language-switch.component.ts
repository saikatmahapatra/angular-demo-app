import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { languageList } from 'src/app/@utils/const/language.list';
@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrl: './language-switch.component.scss'
})
export class LanguageSwitchComponent implements OnInit {
  theme = 'light';
  @Output() themeName = new EventEmitter<string>();
  @Input() showBtnIcon = true;
  @Input() showBtnText = false;
  @Input() showTooltip = true;
  @Input() iconClass = '';
  @Input() textClass = '';
  availableLanguageList!: Array<string>;
  selectedLang: string = localStorage.getItem('appLang') || 'en_US';

  constructor(private tranlateSvc: TranslateService) {
    tranlateSvc.addLangs(languageList);
    this.availableLanguageList = this.tranlateSvc.getLangs();
    tranlateSvc.setDefaultLang('en_US');
    if (this.availableLanguageList.includes(this.selectedLang)) {
      tranlateSvc.use(this.selectedLang);
    }
  }

  ngOnInit() {
  }

  changeLanguage(lang: string) {
    if (lang) {
      localStorage.setItem('appLang', lang);
      window.location.reload();
    }
  }
}
