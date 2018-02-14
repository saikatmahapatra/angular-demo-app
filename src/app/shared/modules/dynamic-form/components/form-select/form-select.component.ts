import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../field.interface';
import { FieldConfig } from '../../field-config.interface';

@Component({
  selector: 'form-select',
  styleUrls: ['form-select.component.scss'],
  template: `
    <div class="form-group" [formGroup]="group">
      <label>{{ config.label }}</label>
      <select [formControlName]="config.name" class="{{config.class}}">
        <option value="">{{ config.placeholder }}</option>
        <option *ngFor="let option of config.options">
          {{ option }}
        </option>
      </select>
    </div>
  `
})
export class FormSelectComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
