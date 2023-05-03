import { Component } from '@angular/core';

import { map } from 'rxjs';

import { ProductdbService } from '../productdb.service';
import { Product } from '../Product';
import { Category } from '../Category';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  constructor (
    private Productdb: ProductdbService,
  ) {}

  onClick(): void {
    console.log("Button clicked");
    let test=  new Product(
      22,
      "Test Product",
      Category.mens_clothing,
      "Test Product Description",
      9.99,
      "Test Product Image",
      4.9,
      100
    );

    console.log(test.getJson2());

    this.Productdb.addProduct(test).subscribe(data => {
      console.log(data);
    });
  }

  getClick(): void {
    this.Productdb.getProduct().pipe(map(responseData => {
      const peopleArr: string[] = new Array();
      for (const key in responseData) {
        peopleArr.push(String(responseData[key]));
      }
    }));
  }
}
