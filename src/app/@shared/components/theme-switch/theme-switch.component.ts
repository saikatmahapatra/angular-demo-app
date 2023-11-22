import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss']
})
export class ThemeSwitchComponent implements OnInit {

  theme = 'light';
  @Output() themeName = new EventEmitter<string>();
  @Input() showBtnIcon = true;
  @Input() showBtnText = false;
  @Input() showTooltip = true;
  @Input() iconClass = '';
  @Input() textClass = '';

  constructor() { }

  ngOnInit(): void {
    this.theme = this.getPreferredTheme();
    this.setTheme(this.theme);
    this.themeName.emit(this.theme);
  }

  changeTheme(theme: string) {
    this.theme = theme;
    localStorage.setItem('theme', theme);
    this.setTheme(theme);
    this.themeName.emit(this.theme);
  }

  toggleTheme() {
    this.theme = this.getPreferredTheme() === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', this.theme);
    this.setTheme(this.theme);
    this.themeName.emit(this.theme);
  }

  getPreferredTheme() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  setTheme(theme: string) {
    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-bs-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
  }

}
