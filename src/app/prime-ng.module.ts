import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
// PrimeNg modules need to imported (This prime-ng.module.ts need to be imported where we need primeNG features)
import { AccordionModule } from "primeng/accordion";
import { AutoCompleteModule } from "primeng/autocomplete";
import { BadgeModule } from "primeng/badge";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { CardModule } from "primeng/card";
import { CheckboxModule } from "primeng/checkbox";
import { ChipModule } from "primeng/chip";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { ContextMenuModule } from "primeng/contextmenu";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { FileUploadModule } from "primeng/fileupload";
import { InputSwitchModule } from "primeng/inputswitch";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { KeyFilterModule } from "primeng/keyfilter";
import { ListboxModule } from "primeng/listbox";
import { MessageModule } from "primeng/message";
import { MessagesModule } from "primeng/messages";
import { MultiSelectModule } from "primeng/multiselect";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { PaginatorModule } from "primeng/paginator";
import { PasswordModule } from "primeng/password";
import { ProgressBarModule } from "primeng/progressbar";
import { RadioButtonModule } from "primeng/radiobutton";
import { RatingModule } from "primeng/rating";
import { SelectButtonModule } from "primeng/selectbutton";
import { SliderModule } from "primeng/slider";
import { SplitterModule } from "primeng/splitter";
import { TableModule } from "primeng/table";
import { TabMenuModule } from "primeng/tabmenu";
import { TabViewModule } from "primeng/tabview";
import { ToastModule } from "primeng/toast";
import { TooltipModule } from "primeng/tooltip";
import { TreeSelectModule } from "primeng/treeselect";
import { ChipsModule } from 'primeng/chips';
import { DividerModule } from 'primeng/divider';
import { StepsModule } from 'primeng/steps';

// Add primeNG classess/interfaces here so that it can be used in both import, export
const data = [
  ButtonModule,
  ChipModule,
  CardModule,
  CheckboxModule,
  InputTextModule,
  KeyFilterModule,
  OverlayPanelModule,
  PaginatorModule,
  TableModule,
  MessageModule,
  MessagesModule,
  PasswordModule,
  DropdownModule,
  RadioButtonModule,
  ProgressBarModule,
  BadgeModule,
  InputTextareaModule,
  CalendarModule,
  SliderModule,
  RatingModule,
  InputSwitchModule,
  ListboxModule,
  TabMenuModule,
  TabViewModule,
  AccordionModule,
  ToastModule,
  MultiSelectModule,
  TooltipModule,
  FileUploadModule,
  DialogModule,
  ContextMenuModule,
  SelectButtonModule,
  ConfirmPopupModule,
  AutoCompleteModule,
  SplitterModule,
  BreadcrumbModule,
  TreeSelectModule,
  ChipsModule,
  DividerModule,
  StepsModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...data],
  exports: [...data],
})
export class PrimeNgModule {}
