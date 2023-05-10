import { Component, OnInit } from '@angular/core';

import { Product } from '../product';
import { Account } from '../account';
import { Order } from '../order';
import { Category } from '../Category';

import { ProductdbService } from '../productdb.service';
import { AccountdbService } from '../accountdb.service';
import { OrderdbService } from '../orderdb.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  account: Account = {
    fName: "",
    lName: "",
    email: "",
    password: ""
  }
  cart: Order = {
    account: "null",
    date: 0,
    items: []
  }
  actualCartItems: string[] = []

  constructor(
    private productdb: ProductdbService,
    private accountdb: AccountdbService,
    private orderdb: OrderdbService,
  ) { }

  ngOnInit(): void {
    this.accountdb.getSignedIn2().subscribe(account => {
      this.account = account;
      this.orderdb.getCartFromEmail(this.account.email).subscribe(cart => {
        this.cart = cart;
        for (let i of cart.items) {
          if (i !== "temp") {
            this.actualCartItems.push(i);
          }
        }
      })
    })
  }
}
