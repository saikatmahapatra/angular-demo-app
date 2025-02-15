import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sumDigit',
    standalone: false
})
export class SumDigitPipePipe implements PipeTransform {

  transform(value: any, args1?: any, args2?: any): any {
    console.log('args in pipe', args1, args2);
    let sum = null;
    if (value) {
      sum = value.toString().split('').map(Number).reduce((c: any, a: any) => {
        return c + a;
      });
    }
    return sum;
  }

}
