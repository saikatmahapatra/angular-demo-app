import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { CheckboxModule } from "primeng/checkbox";
import { InputTextModule } from "primeng/inputtext";
import { KeyFilterModule } from "primeng/keyfilter";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { PaginatorModule } from "primeng/paginator";
import { TableModule } from "primeng/table";
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ProgressBarModule } from 'primeng/progressbar';
import { BadgeModule } from 'primeng/badge';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ListboxModule } from 'primeng/listbox';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import { ToastModule } from 'primeng/toast';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { DividerModule } from 'primeng/divider';

const data = [
  ButtonModule,
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
  EditorModule,
  DividerModule
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...data
  ],
  exports: [
    ...data
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrimeNgModule { }
