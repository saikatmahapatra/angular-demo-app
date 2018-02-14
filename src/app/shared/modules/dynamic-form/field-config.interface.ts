import { ValidatorFn } from '@angular/forms';

export interface FieldConfig {
  label?: string,
  type: string,
  name: string,
  class?: any,
  containerClass?: any,
  value?: any,
  validation?: ValidatorFn[],
  options?: string[],
  placeholder?: string,
  disabled?: boolean
}
