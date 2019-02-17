import { Injectable, ViewChild, ViewContainerRef, ComponentFactoryResolver, Component } from '@angular/core';

@Injectable()
export class DynamicComponentLoaderService {

  constructor(private _componentFactoryResolver: ComponentFactoryResolver) { }

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

}
