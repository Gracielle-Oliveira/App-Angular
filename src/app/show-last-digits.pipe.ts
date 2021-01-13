import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showLastDigits'
})
export class ShowLastDigitsPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.slice(-5, -1);
  }

}
