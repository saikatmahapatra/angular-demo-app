import { Inject, Injectable, EventEmitter, Output, HostListener } from '@angular/core';

@Injectable({
  // we declare that this service should be created
  // by the root application injector.
  providedIn: 'root'
})

export class CommonService {

  constructor(
  ) { }
  showAppLogs = true;
  pData: any;
  globalData: any;
  screenWidth: number | undefined;
  screenHeight: number | undefined;
  screenOrientation: string | undefined;
  screenCaptureObj: any = {};

  @Output() componentLoaded = new EventEmitter<boolean>();
  @Output() issubmitClicked = new EventEmitter<any>();
  @Output() currentStep = new EventEmitter<boolean>();

  @HostListener('window:resize', ['$event'])

  log(msg: any) {
    if (this.showAppLogs === true) {
      console.log(msg);
    }
  }
  warn(msg: any) {
    if (this.showAppLogs === true) {
      console.warn(msg);
    }
  }
  error(msg: any) {
    if (this.showAppLogs === true) {
      console.error(msg);
    }
  }

  scrollToTop() {
    window.document.body.scrollTop = 0;
    window.document.documentElement.scrollTop = 0;
  }
  getScreenPosition() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    return this.screenOrientation = this.screenWidth > this.screenHeight ? 'landscape' : 'portrait';
  }
  getDeviceType() {
    const check = window.navigator.userAgent;
    if (check.match(/Mobile/) && (check.match(/iPhone/) || check.match(/Android/))) {
      console.log('mobile');
      return 'mobile';
    } else if (!check.match(/Mobile/) && (check.match(/Safari/) || check.match(/Chrome/))) {
      console.log('desktop');
      return 'desktop';
    } else {
      console.log('tablet');
      return 'tablet';
    }
  }
  getScreenView(): string {
    const width: number = window.screen.width;
    let screenView = 'min';
    if (width >= 576 && width < 769) {
      screenView = 'small';
    } else if (width >= 769 && width < 1012) {
      screenView = 'medium';
    } else if (width >= 1012 && width < 1200) {
      screenView = 'large';
    } else if (width >= 1200) {
      screenView = 'max';
    }
    return screenView;
  }
  // getCookieValue(key: string): string | undefined {
  //   const cookie = document.cookie.split(';');
  //   for (let i = 0; i < cookie.length; i++) {

  //     if (cookie[i].trim().startsWith(key)) {
  //       return cookie[i].trim().split(key + '=')[1];
  //     }
  //   }
  // }
  setCookieValue(key: string, value: any) {
    document.cookie = key + '=' + value;
  }

  getTimeAgo(phpTimeStamp: string) {
    const current = new Date().getTime();
    const previous = new Date(Date.parse(phpTimeStamp)).getTime();
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + ' months ago';
    }

    else {
      return Math.round(elapsed / msPerYear) + ' years ago';
    }
  }
}
