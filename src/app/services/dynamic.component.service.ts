import {Injectable, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

@Injectable()

export class DynamicComponentService {
  constructor (private _componentFactoryResolver :  ComponentFactoryResolver) {

  }

  authLayout = [
    'marqueePglt',
    'heroPglt',
    'mainPglt',
    'utilityPglt'
  ];

  unauthLayout = [
    'mainPglt',
  ];

  componentNames = {
    'payment' : 'payment'
  };

  loadComponent(layoutType:  string, componentList:  any, registeredComponent:  any, viewContainers:  any) {
    const currentLayout = this[layoutType];
    let componentClass;
    let componentFactory;
    let componentAliasName;
    for (let countLayoutBlock = 0; countLayoutBlock < currentLayout.length; countLayoutBlock++) {
      for (let countModules = 0; countModules < componentList[currentLayout[countLayoutBlock]].length; countModules++) {
        componentAliasName = componentList[currentLayout[countLayoutBlock]][countModules];
        componentClass = registeredComponent[componentAliasName];
        if (componentClass !== undefined) {
          componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentClass);
          viewContainers[currentLayout[countLayoutBlock]].createComponent(componentFactory);
        } else {
          console.error('Error :  ' + componentAliasName + ' is not found in component registry');
        }
      }

    }
  }


}
