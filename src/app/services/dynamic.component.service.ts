import {Injectable,ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponent{
  constructor(private cFactoryResolve: ComponentFactoryResolver){

  }
  unauthLayout = [
    "marqueePglt",
    "cubby",
    "mainPglt",
    "utilityPglt"
  ];
  authLayout = [
    "marqueePglt",
    "heroPglt",
    "mainPglt",
    "utilityPglt"
  ];
  processLayout = [
    "heroPglt",
    "mainPglt",
    "marqueePglt",
    "cubby",
    "utilityPglt"
  ];

  // note: notifications are page level notifications
  componentNames = {
    "autopay_status":"autopay-status",
    "autopay_enroll_option":"autopay-enroll-option",
    "autopay_manage_option":"autopay-manage-option",
    "account_summary":"account-summary",
    "payment_summary":"payment-summary",
    "payment_history":"payment-history",
    "page_title": "page-title",
    "make_a_payment": "make-a-payment",
    "card_selector": "card-selector",
    "dispute_charge": "dispute-charge",
    "report_lost_or_stolen_card":"report_lost_or_stolen_card",
    "faq": "faq",
    "notifications": "notifications",
    "mobile-faq": "faq-small-view",
    "autopay": "autopay",
    "forbearance": "forbearance",
    "payment_sources": "payment-sources",
    "change_due_date_link": "change-due-date-link",
    "change_due_date": "change-due-date",
    "add_edit_payment_source": "add-edit-payment-source",
    "manage_payment_sources":"manage-payment-sources",
    "promise_to_pay": "promise-to-pay",
    "multiple-payments": "multiple-payments",
    "make_a_payment_with_options": "payment-with-options",
  };

  createComponent(layoutType: string, componentList: any, registeredComponent: any, viewContainers:any){
    let componentClass, componentFactory, currentLayout = this[layoutType], mapComponent;
    for(var i=0; i< currentLayout.length; i++){
      for(var j=0; j< componentList.eligibleModules[currentLayout[i]].length; j++){
        mapComponent = this.componentNames[componentList.eligibleModules[currentLayout[i]][j]];
        componentClass = registeredComponent[mapComponent];
        if(componentClass !== undefined) { //added condition incase if undefined module comes in eligible modules list
          componentFactory = this.cFactoryResolve.resolveComponentFactory(componentClass);
          viewContainers[currentLayout[i]].createComponent(componentFactory);
        }
        if (layoutType === 'authLayout' && currentLayout[i] === 'utilityPglt') {
          componentClass = registeredComponent["dfp-utility-middle"];
          componentFactory = this.cFactoryResolve.resolveComponentFactory(componentClass);
          viewContainers[currentLayout[i]].createComponent(componentFactory);
        }
      }
    }
  }
}
