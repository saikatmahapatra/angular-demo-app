import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mask'
})
export class MaskPipe implements PipeTransform {
  private replaceChar = 'x';
  private maskedValue = '';
  transform(value: any, maskType: string): any {
    if(maskType == 'email'){      
      let emailArr = value.split('@');
      let emailLength = emailArr[0].length;
      console.log(emailLength);
      let i = 0;
      let maskedStr = '';
      for(i=0; i<emailLength; i++){
        maskedStr+= this.replaceChar;
      }
      emailArr[0]= maskedStr;
      this.maskedValue = emailArr.join('@');
      return this.maskedValue;
    }else{
      this.maskedValue = value;
    }    
    return this.maskedValue;
  }

}
