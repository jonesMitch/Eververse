import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../product';
import { Category } from '../Category';
import { Account } from '../account';

import { ProductdbService } from '../productdb.service';
import { AccountdbService } from '../accountdb.service';
import { OrderdbService } from '../orderdb.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  account: Account | null = null;

  product: Product = {
    id: -1,
    title: "",
    description: "",
    category: Category.blank,
    image: "",
    price: 0,
    rating: {
      rate: 0,
      count: 0
    }
  }

  constructor(
    private route: ActivatedRoute,
    private productdb: ProductdbService,
    private accountdb: AccountdbService,
    private orderdb: OrderdbService,
  ) { }

  ngOnInit(): void {
    this.getProduct();
    this.accountdb.getSignedIn2().subscribe(account => {
      this.account = account;
    })
  }

  getProduct(): void {
    let idString: string | null = this.route.snapshot.paramMap.get('id');
    let id: number = -1;
    if (idString !== null) id = parseInt(idString);

    this.productdb.getProductById(id).subscribe(products => {
      this.product = products[0];
    })
  }

  getStars(): number[] {
    let stars: number[] = new Array(3);
    stars[0] = Math.floor(this.product.rating.rate);
    if (this.product.rating.rate - stars[0] !== 0) {
      stars[1] = 1;
    } else {
      stars[1] = 0;
    }
    stars[2] = (stars[1]===1?4:5) - stars[0];
    return stars;
  }

  addToCart(): void {
    if (this.account !== null) {
      this.orderdb.addProductToCart(this.account.email, this.product.id, 1).subscribe();
      this.orderdb.changeQuantity(1);
    }
  }
}
