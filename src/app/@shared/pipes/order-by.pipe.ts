import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderBy',
    standalone: false
})
export class OrderByPipe implements PipeTransform {

  transform(value: any | any[], expression?: any, reverse?: boolean, isCaseInsensitive: boolean = false, comparator?: Function): any {
    if (!value) {
      return value;
    }

    if (Array.isArray(value)) {
      return this.sortArray(value, expression, reverse, isCaseInsensitive, comparator);
    }

    if (typeof value === 'object') {
      return this.transformObject(value, expression, reverse, isCaseInsensitive, comparator);
    }

    return value;
  }
  /**
     * Check if a value is a string
     *
     * @param value
     */
  static isString(value: any) {
    return typeof value === 'string' || value instanceof String;
  }

  /**
   * Sorts values ignoring the case
   *
   * @param a
   * @param b
   */
  static caseInsensitiveSort(a: string, b: string) {
    if (OrderByPipe.isString(a) && OrderByPipe.isString(b)) {
      return a.localeCompare(b);
    }
    return OrderByPipe.defaultCompare(a, b);
  }

  /**
   * Default compare method
   * 
   * @param a 
   * @param b 
   */
  static defaultCompare(a: any, b: any) {
    return a > b ? 1 : -1;
  }

  /**
   * Parse expression, split into items
   * @param expression
   * @returns {string[]}
   */
  static parseExpression(expression: string): string[] {
    expression = expression.replace(/\[(\w+)\]/g, '.$1');
    expression = expression.replace(/^\./, '');
    return expression.split('.');
  }

  /**
   * Get value by expression
   *
   * @param object
   * @param expression
   * @returns {any}
   */
  static getValue(object: any, expression: string[]) {
    for (let i = 0, n = expression.length; i < n; ++i) {
      const k = expression[i];
      if (!(k in object)) {
        return;
      }
      object = object[k];
    }

    return object;
  }

  /**
   * Set value by expression
   *
   * @param object
   * @param value
   * @param expression
   */
  static setValue(object: any, value: any, expression: string[]) {
    let i;
    for (i = 0; i < expression.length - 1; i++) {
      object = object[expression[i]];
    }

    object[expression[i]] = value;
  }

  /**
   * Sort array
   *
   * @param value
   * @param expression
   * @param reverse
   * @param isCaseInsensitive
   * @param comparator
   * @returns {any[]}
   */
  private sortArray(value: any[], expression?: any, reverse?: boolean, isCaseInsensitive?: boolean, comparator?: Function): any[] {
    const isDeepLink = expression && expression.indexOf('.') !== -1;

    if (isDeepLink) {
      expression = OrderByPipe.parseExpression(expression);
    }

    let compareFn: Function;

    if (comparator && typeof comparator === 'function') {
      compareFn = comparator;
    } else {
      compareFn = isCaseInsensitive ? OrderByPipe.caseInsensitiveSort : OrderByPipe.defaultCompare;
    }

    let array: any[] = value.sort((a: any, b: any): number => {
      if (!expression) {
        return compareFn(a, b);
      }

      if (!isDeepLink) {
        if (a && b) {
          return compareFn(a[expression], b[expression]);
        }
        return compareFn(a, b);
      }

      return compareFn(OrderByPipe.getValue(a, expression), OrderByPipe.getValue(b, expression));
    });

    if (reverse) {
      return array.reverse();
    }

    return array;
  }

  /**
   * Transform Object
   *
   * @param value
   * @param expression
   * @param reverse
   * @param isCaseInsensitive
   * @param comparator
   * @returns {any[]}
   */
  private transformObject(value: any | any[], expression?: any, reverse?: boolean, isCaseInsensitive?: boolean, comparator?: Function): any {

    let parsedExpression = OrderByPipe.parseExpression(expression);
    let lastPredicate: any= parsedExpression.pop() ? parsedExpression.pop() : '';
    let oldValue = OrderByPipe.getValue(value, parsedExpression);
 
    if (!Array.isArray(oldValue)) {
      parsedExpression.push(lastPredicate);
      lastPredicate = '';
      oldValue = OrderByPipe.getValue(value, parsedExpression);
    }

    if (!oldValue) {
      return value;
    }

    OrderByPipe.setValue(value, this.transform(oldValue, lastPredicate, reverse, isCaseInsensitive), parsedExpression);
    return value;
  }
}