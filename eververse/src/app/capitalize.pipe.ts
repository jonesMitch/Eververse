import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string): unknown {
    let firstLetter: string = value[0];
    return firstLetter.toUpperCase() + value.slice(1, value.length);
  }

}
