import { Injectable, ViewChild, ViewContainerRef, ComponentFactoryResolver, Component } from '@angular/core';

@Injectable()
export class DynamicComponentLoaderService {

  constructor(private _componentFactoryResolver: ComponentFactoryResolver) { }
  authLayout = [
    'marqueePglt',
    'heroPglt',
    'mainPglt',
    'utilityPglt'
  ];
  componentNames = {
    'autopay_comp': 'autopay_comp',
    'payment_history_comp': 'payment_history_comp'
  };

  loadComponent(layoutType: string, componentList: any, registeredComponent: any, viewContainers: any) {
    let componentClass, componentFactory, currentLayout = this[layoutType], mapComponent;
    for (let i = 0; i < currentLayout.length; i++) {
      console.log(currentLayout);
      for (let j = 0; j < componentList.eligibleModules[currentLayout[i]].length; j++) {
        console.log(componentList.eligibleModules[currentLayout[i]]);
        mapComponent = this.componentNames[componentList.eligibleModules[currentLayout[i]][j]];
        componentClass = registeredComponent[mapComponent];
        if (componentClass !== undefined) {
          componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentClass);
          viewContainers[currentLayout[i]].createComponent(componentFactory);
        }
      }

    }
  }

}
