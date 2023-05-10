import { Component, Input, EventEmitter, Output } from '@angular/core';

import { Product } from '../product';
import { Order } from '../order';
import { Account } from '../account';
import { Category } from '../Category';

import { ProductdbService } from '../productdb.service';
import { OrderdbService } from '../orderdb.service';
import { AccountdbService } from '../accountdb.service';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() account: Account | null = null;
  @Input() product: Product = {
    title: "--------",
    description: "--------",
    id: -1,
    category: Category.blank,
    image: "--------",
    price: -1,
    rating: {
      rate: 0,
      count: 0
    }
  }

  constructor(
    private productdb: ProductdbService,
    private orderdb: OrderdbService,
    private accountdb: AccountdbService,
  ) { }

  // idk
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
      this.orderdb.incrementQuantity();
    }
  }
}