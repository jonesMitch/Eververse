import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  cartQuantity: cartQuantity[] = new Array();
  cartPrice: cartPrice[] = new Array();
  
  actualCartItems: string[] = []

  subTotal: number = 0;
  tax: number = 0;
  total: number = 0;

  constructor(
    private productdb: ProductdbService,
    private accountdb: AccountdbService,
    private orderdb: OrderdbService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.accountdb.getSignedIn2().subscribe(account => {
      this.account = account;
      this.orderdb.getCartFromEmail(this.account.email).subscribe(cart => {
        this.cart = cart;
        // I hope the orders don't get too big, this is a terrible way to do this
        for (let item of cart.items) {
          if (item === "temp") continue;
          let inCartQuantity: boolean = false;
          for (let cartItem of this.cartQuantity) {
            if (cartItem.key === item) {
              cartItem.quantity++;
              inCartQuantity = true;
            }
          }
          if (!inCartQuantity) {
            this.cartQuantity.push({ key: item, quantity: 1, email: this.account.email });
          }
        }
        this.updatePrices();
        this.orderdb.cartQuantity$.subscribe(_ => {
          this.updatePrices();
        })
      })
    })
  }

  updatePrices(): void {
    this.subTotal = 0;
    this.tax = 0;
    this.total = 0;
    this.orderdb.getCartFromEmail(this.account.email).subscribe(cart => {
      for (let item of cart.items) {
        if (item !== "temp") {
          this.productdb.getProductByKey(item).subscribe(product => {
            this.subTotal += product.price;
            this.tax += product.price * 0.075; // sales tax rate in fargo
            this.total += product.price + (product.price * 0.075);
          })
        }
      }
    })
  }

  placeOrder(): void {
    this.orderdb.moveCartToOrders(this.account.email).subscribe();
    this.orderdb.changeQuantity(0.1);
    this.router.navigate(['/homepage']);
  }
}

interface cartPrice {
  product: Product,
  quantity: number
}

export interface cartQuantity {
  key: string,
  quantity: number,
  email: string, // just so I can avoid calling the database. This whole project is implemented terribly
}