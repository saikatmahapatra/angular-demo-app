import { Injectable, ViewChild, ViewContainerRef, ComponentFactoryResolver, Component } from '@angular/core';
@Injectable()
export class AppService {

  showAppLogs = true;

  // layout block/pagelet block for authLayout
  authLayout = [
    'marqueePglt',
    'heroPglt',
    'mainPglt',
    'utilityPglt'
  ];

  // layout block/pagelet block for unauthLayout
  unauthLayout = [
    'mainPglt',
  ];

  constructor(private _componentFactoryResolver: ComponentFactoryResolver) { }

  someMethod(){
    return 'this is from someMethdod at app.service.ts';
  }

  loadComponent(layoutType: string, eligibleModulesAtLayoutBlock: any, componentRegistry: any, viewContainers: any) {
    const currentLayout = this[layoutType];
    let componentClass;
    let componentFactory;
    let componentAliasName;
    for (let countLayoutBlock = 0; countLayoutBlock < currentLayout.length; countLayoutBlock++) {
      for (let countModules = 0; countModules < eligibleModulesAtLayoutBlock[currentLayout[countLayoutBlock]].length; countModules++) {
        componentAliasName = eligibleModulesAtLayoutBlock[currentLayout[countLayoutBlock]][countModules];
        componentClass = componentRegistry[componentAliasName];
        if (componentClass !== undefined) {
          componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentClass);
          viewContainers[currentLayout[countLayoutBlock]].createComponent(componentFactory);
        } else {
          console.error('Error: ' + componentAliasName + ' is not found in component registry');
        }
      }

    }
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
