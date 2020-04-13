import {Injectable, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

@Injectable({
  // we declare that this service should be created
  // by the root application injector.
  providedIn: 'root'
})

export class DynamicComponentService {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {  }

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
    let mapComponent;
    for (let countLayoutBlock = 0; countLayoutBlock < currentLayout.length; countLayoutBlock++) {
      for (let countModules = 0; countModules < componentList[currentLayout[countLayoutBlock]].length; countModules++) {
        mapComponent = componentList[currentLayout[countLayoutBlock]][countModules];
        componentClass = registeredComponent[mapComponent];
        if (componentClass !== undefined) {
          componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
          viewContainers[currentLayout[countLayoutBlock]].createComponent(componentFactory);
        } else {
          console.error('Error :  ' + mapComponent + ' is not found in component registry');
        }
      }

    }
  }


}
