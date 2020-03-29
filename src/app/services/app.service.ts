import { Injectable, ViewChild, ViewContainerRef, ComponentFactoryResolver, Component } from '@angular/core';

@Injectable()

export class AppService {
  showAppLogs = true;

  constructor(private _componentFactoryResolver: ComponentFactoryResolver) { }

  someMethod(){
    return 'this is from someMethdod at app.service.ts';
  }

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
