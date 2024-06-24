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
  @Input() buttonText = '';
  selectedLang: string = localStorage.getItem('appLang') || 'en_US';
  selectedLangLabel: string = '';
  languageListDropdown = languageList;
  allowedLanguageList: Array<string> = [];

  constructor(private tranlateSvc: TranslateService) {
    const list: Array<string> = [];
    languageList.forEach((lang) => {
      list.push(lang.code);
    });
    this.tranlateSvc.addLangs(list);
    this.allowedLanguageList = this.tranlateSvc.getLangs();
    if (this.allowedLanguageList.includes(this.selectedLang)) {
      this.tranlateSvc.use(this.selectedLang);
    }
  }

  ngOnInit() {
    this.getSelectedLangLabel();
  }

  changeLanguage(langCode: string) {
    if (langCode && this.allowedLanguageList.includes(langCode)) {
      localStorage.setItem('appLang', langCode);
      this.selectedLang = langCode;
      window.location.reload();
      this.getSelectedLangLabel();
    }
  }

  getSelectedLangLabel() {
    const lang = languageList.find((lang) => lang.code === this.selectedLang);
    this.selectedLangLabel = lang ? lang.label : 'EN';
  }
}
