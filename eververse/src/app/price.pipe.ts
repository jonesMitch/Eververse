import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(price: number): string {
    const formatter = new Intl.NumberFormat("en-us", {
      style: "currency",
      currency: "USD",
    })

    return formatter.format(price);
  }

}
