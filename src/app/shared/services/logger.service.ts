import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {

  constructor() { }

  log(msg: any) {
    console.log(msg);
  }

  warn(msg: any) {
    console.warn(msg);
  }

  error(msg: any) {
    console.error(msg);
  }

}
