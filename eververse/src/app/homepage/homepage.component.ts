import { Component } from '@angular/core';

import { ProductdbService } from '../productdb.service';
import { AccountdbService } from '../accountdb.service';
import { OrderdbService } from '../orderdb.service';

import { Product } from '../product';
import { Category } from '../Category';
import { Account } from '../account';
import { Order } from '../order';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  constructor (
    private productdb: ProductdbService,
    private accountdb: AccountdbService,
    private orderdb: OrderdbService,
  ) {}

  test: Order = {
    account: "Placeholder", 
    date: Date.now(),
    items: ["Placeholder"]
  }

  addCart(): void {
    this.orderdb.addCart("abray@bray.tech").subscribe();
  }

  getCart(): void {
    this.orderdb.getCartFromEmail("abray@bray.tech").subscribe(data => {
      console.log(data.items);
    });
  }

  addToCart(): void {
    this.orderdb.addProductToCart("abray@bray.tech", 2).subscribe();
  }

  deleteFromCart(): void {
    this.orderdb.removeItemFromCart("abray@bray.tech", 1).subscribe();
  }

  deleteAllFromCart(): void {
    this.orderdb.removeAllItemsFromCart("abray@bray.tech").subscribe();
  }

  moveCartToOrders(): void {
    this.orderdb.moveCartToOrders("abray@bray.tech").subscribe();
  }
}
