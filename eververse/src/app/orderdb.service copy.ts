// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// import { Order } from './order';
// import { db } from './settings';
// import { Observable, map, concatMap } from "rxjs";
// import { AccountdbService } from './accountdb.service';
// import { ProductdbService } from './productdb.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class OrderdbService {

//   constructor(
//     private http: HttpClient,
//     private accountdb: AccountdbService,
//     private productdb: ProductdbService,
//   ) { }

//   // account field of newOrder should be blank, I regret designing it like this
//   // but it's too late to fix it now
//   addOrder(email: string, newOrder: Order) {
//     return this.accountdb.getAccountKey(email).pipe(
//       concatMap(data => {
//         newOrder.account = data;
//         return this.http.post(db.url + "orders.json", newOrder);
//       })
//     );
//   }

//   // This is for testing only
//   addOrderWithProduct(email: string, newOrder: Order, productId: number) {
//     return this.accountdb.getAccountKey(email).pipe(
//       concatMap(key => {
//         return this.productdb.getProductKey(productId).pipe(
//           concatMap(product => {
//             newOrder.account = key;
//             newOrder.items.push(product);
//             return this.http.post(db.url + "orders.json", newOrder);
//           })
//         )
//       })
//     );
//   }

//   getOrders(): Observable<Order[]> {
//     return this.http.get<Order[]>(db.url + "orders.json")
//       .pipe(map(rs => {
//         let orderArr: Order[] = new Array();
//         for (let key in rs) {
//           orderArr.push(rs[key]);
//         }
//         return orderArr;
//       }));
//   }

//   getOrdersByEmail(email: string): Observable<Order[]> {
//     // get account hash, get orders
//     return this.accountdb.getAccountKey(email).pipe(
//       concatMap(key => {
//         return this.http.get<Order[]>(db.url + "orders.json"
//           + `?orderBy="account"&equalTo="${key}"`).pipe(map(rs => {
//             let orderArr: Order[] = new Array();
//             for (let k in rs) {
//               orderArr.push(rs[k]);
//             }
//             return orderArr;
//           }))
//       })
//     )
//   }

//   updateCartWithProduct2(email: string, productId: number) {
//     //get order hash, get account hash, get product hash, get order, add item / put order
//     return this.getOrderKey(email).pipe(
//       concatMap(orderKey => {
//         return this.accountdb.getAccountKey(email).pipe(
//           concatMap(accountKey => {
//             return this.productdb.getProductKey(productId).pipe(
//               concatMap(productKey => {
//                 return this.getOrdersByEmail(email).pipe(
//                   concatMap(orders => {
//                     return this.http.put(`${db.url}orders/${orderKey}/items`, productKey);
//                   })
//                 )
//               })
//             )
//           })
//         )
//       })
//     )
//   }

//   getcartkey(email: string): Observable<string> {
//     // get account key, get orders from email, return order.ordered === false
//     return this.accountdb.getAccountKey(email).pipe(
//       concatMap(accountKey => {
//         return this.getOrdersByEmail(email).pipe(
//           concatMap(orders => {
//             for (let i = 0; i < orders.length; i++) {
              
//             }
//           })
//         )
//       })
//     )
//   }

//   getOrderKey(email: string): Observable<string[]> {
//     // get email hash, get order
//     return this.accountdb.getAccountKey(email).pipe(
//       concatMap(emailKey => {
//         return this.http.get(db.url + "orders.json"
//          + `?orderBy="account"&equalTo="${emailKey}"`)
//           .pipe(map(rs => {
//             let keys: string[] = new Array();
//             for (let i in rs) {
//               keys.push(i);
//             }
//             return keys;
//           }))
//       })
//     );
//   }

//   updateCartWithProduct(email: string, productId: number) {
//     // get email hash, get product hash, get order, build body + add product has to items, put body
//     return this.accountdb.getAccountKey(email).pipe(
//       concatMap(emailKey => {
//         return this.productdb.getProductKey(productId).pipe(
//           concatMap(productKey => {
//             return this.getOrdersByEmail(email).pipe(
//               concatMap(orders => {
//                 for (let i = 0; i < orders.length; i++) {
//                   let cart: Order;
//                   if (orders[i].ordered === false) {
//                     cart = orders[i];
//                     cart.items.push(productKey);
//                   }
//                   return this.http.put(`${db.url}orders/${}`)
//                 }
//               })
//             )
//           })
//         )
//       })
//     )
//   }

  
// }
