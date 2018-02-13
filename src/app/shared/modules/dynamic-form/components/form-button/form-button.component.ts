import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../field.interface';
import { FieldConfig } from '../../field-config.interface';

@Component({
  selector: 'form-button',
  styleUrls: ['form-button.component.scss'],
  template: `
    <div 
      class="dynamic-field form-button"
      [formGroup]="group">
      <button
        [disabled]="config.disabled"
        type="{{config.type}}" class="{{config.class}}">
        {{ config.label }}
      </button>
    </div>
  `
})
export class FormButtonComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
