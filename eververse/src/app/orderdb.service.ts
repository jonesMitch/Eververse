import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Order } from './order';
import { db } from './settings';
import { Observable, map, concatMap, Subject } from "rxjs";
import { AccountdbService } from './accountdb.service';
import { ProductdbService } from './productdb.service';

@Injectable({
  providedIn: 'root'
})
export class OrderdbService {
  private _cartQuantity = new Subject<number>();
  cartQuantity$ = this._cartQuantity.asObservable();

  incrementQuantity() {
    this._cartQuantity.next(1);
  }

  constructor(
    private http: HttpClient,
    private accountdb: AccountdbService,
    private productdb: ProductdbService,
  ) { }

  // I am just gonna ignore deleting accounts and orders form the database

  // this assumes a cart does not already exist in the database for this email
  // get email hash, post new cart
  addCart(email: string) {
    return this.accountdb.getAccountKey(email).pipe(
      concatMap(accountKey => {
        let newCart: Order = {
          account: accountKey,
          date: Date.now(),
          items: ["temp"]
        }
        return this.http.post(db.url + "carts.json", newCart)
      })
    )
  }

  // get cart key
  getCartKey(email: string) {
    return this.accountdb.getAccountKey(email).pipe(
      concatMap(accountKey => {
        return this.http.get<Order[]>(db.url + "carts.json"
          + `?orderBy="account"&equalTo="${accountKey}"`).pipe(
            map(rs => {
              let key: string = "notAKey";
              for (let i in rs) {
                key = i;
              }
              return key;
            })
          )
      })
    )
  }

  // get cart from email
  // get email hash, get cart object from email hash
  getCartFromEmail(email: string) {
    return this.accountdb.getAccountKey(email).pipe(
      concatMap(accountKey => {
        return this.http.get<Order[]>(db.url + "carts.json"
          + `?orderBy="account"&equalTo="${accountKey}"`).pipe(
            map(carts => {
              let cartArr: Order[] = new Array();
              for (let k in carts) {
                cartArr.push(carts[k]);
              }
              return cartArr[0];
            })
          )
      })
    )
  }

  // get product hash, get cart hash, get cart, put cart
  addProductToCart(email: string, productId: number, quantity: number) {
    return this.productdb.getProductKey(productId).pipe(
      concatMap(productKey => {
        return this.getCartKey(email).pipe(
          concatMap(cartKey => {
            return this.getCartFromEmail(email).pipe(
              concatMap(cart => {
                for (let i = 0; i < quantity; i++) {
                  cart.items.push(productKey);
                }
                let updateCart: Order = {
                  account: cart.account,
                  date: cart.date,
                  items: cart.items
                }
                return this.http.put(`${db.url}carts/${cartKey}.json`, updateCart);
              })
            )
          })
        )
      })
    )
  }

  // remove item from cart
  // same as adding to the cart, just filtering the items array before PUT
  removeItemFromCart(email: string, productId: number, quantity: number) {
    return this.productdb.getProductKey(productId).pipe(
      concatMap(productKey => this.getCartKey(email).pipe(
        concatMap(cartKey => this.getCartFromEmail(email).pipe(
          concatMap(cart => {
            let newItems: string[] = new Array();
            for (let i = 0; i < cart.items.length; i++) {
              if (cart.items[i] !== productKey || quantity != 0) {
                newItems.push(cart.items[i]);
                quantity--;
              }
            }
            let updateCart: Order = {
              account: cart.account,
              date: cart.date,
              items: newItems
            }
            return this.http.put(`${db.url}carts/${cartKey}.json`, updateCart);
          })
        ))
      ))
    )
  }

  // clear cart
  // same as removeItemFromCart, just removing all items
  removeAllItemsFromCart(email: string) {
    return this.getCartKey(email).pipe(
      concatMap(cartKey => this.getCartFromEmail(email).pipe(
        concatMap(cart => {
          let updateCart: Order = {
            account: cart.account,
            date: cart.date,
            items: ["temp"]
          }
          return this.http.put(`${db.url}carts/${cartKey}.json`, updateCart);
        })
      ))
    )
  }

  // move cart to orders (cart contents were ordered)
  // get cart hash, get cart, clear items from cart, POST to orders
  moveCartToOrders(email: string) {
    let order: Order;
    return this.getCartKey(email).pipe(
      concatMap(cartKey => this.getCartFromEmail(email).pipe(
        concatMap(cart => {
          order = cart;
          let newCart: Order = {
            account: cart.account,
            date: Date.now(),
            items: ["temp"]
          }
          return this.http.put(`${db.url}carts/${cartKey}.json`, newCart).pipe(
            concatMap(data => this.http.post(`${db.url}orders.json`, order))
          )
        })
      ))
    )
  }

  // get orders (order history)
  // get email hash, get orders with that email, sort by date?
  // untested
  getOrderHistory(email: string) {
    return this.accountdb.getAccountKey(email).pipe(
      concatMap(accountKey =>
        this.http.get(db.url + "orders.json"
           + `?orderBy="account"&equalTo="${accountKey}"`)
      )
    )
  }
}
