import { Component } from '@angular/core';

import { map } from 'rxjs';

import { ProductdbService } from '../productdb.service';
// import { Product } from '../Product';
// import { Product } from '../product2';
import { Product } from '../product3';
import { Category } from '../Category';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  constructor (
    private productdb: ProductdbService,
  ) {}

  test: Product = {
    title: "",
		price: 0.00,
		description: "",
		category: Category.blank,
		image: "",
    rating: {
      rate: 0.0,
      count: 0
    }
  };

  testArr: Product[] = new Array();

  onClick(): void {
    console.log("Add button clicked");

    let test: Product = {
      title: "Mens Cotton Jacket",
		  price: 55.99,
		  description: "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
		  category: Category.mens_clothing,
		  image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      rating: {
        rate: 4.7,
        count: 500
      }
    }

    this.productdb.addProduct(test).subscribe(data => {
      console.log(data);
    })
  }

  getClick(): void {
    let productArr: any[] = new Array();
    this.productdb.getProducts().subscribe(data => {
      console.log("Data length: " + data.length);
      for (var i in data) {
        console.log(i);
      }
    });

    for (let i in productArr) {
      console.log(i);
    }
    console.log(productArr.length);
  }

  getClick2(): void {
    this.productdb.getProducts().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        this.testArr.push(data[i]);
      }
      this.test = this.testArr[0];
      console.log(this.testArr.length);
    })
  }
}
