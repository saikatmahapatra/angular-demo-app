import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
  showAppLogs = true;
  constructor() { }

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

}
