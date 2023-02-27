import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/app/@core/services/cookie.service';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss']
})
export class CookieConsentComponent implements OnInit {
  accepted = false;
  constructor(
    private cookieSvc: CookieService
  ) { }

  ngOnInit(): void {
    this.userAcceptedConsent()
  }

  acceptCookieConsent() {
    this.cookieSvc.deleteCookie('user_cookie_consent');
    this.cookieSvc.setCookie('user_cookie_consent', 1, 30);
    this.userAcceptedConsent();
  }

  userAcceptedConsent() {
    const val = this.cookieSvc.getCookie('user_cookie_consent');
    this.accepted = val == '1' ? true : false;
  }

}
