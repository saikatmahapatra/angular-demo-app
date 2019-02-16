import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
@Injectable()
export class CommonService {

  constructor(private _lg: LoggerService) { }

  someMethod() {
    this._lg.log("Using LoggerService in CommonService");
    return 'Hey! Im CommonService :)';
  }

}
