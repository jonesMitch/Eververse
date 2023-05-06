import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from './product';
import { db } from './settings';
import { Observable, catchError, map, concatMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductdbService {

  constructor(
    private http: HttpClient,
  ) { }

  addProduct(newProduct: Product) {
    return this.http.post(db.url + "products.json", newProduct)
      .pipe(map(rs => {
        return rs;
      }))
  }

  getProducts():  Observable<Product[]> {
    return this.http.get<Product[]>(db.url + "products.json")
      .pipe(map(rs => {
        const peopleArr: Product[] = [];
        for (let key in rs) {
          peopleArr.push(rs[key]);
        }
        return peopleArr;
      })
    );
  }

  getProductById(id: number) {
    return this.http.get<Product[]>(db.url + "products.json"
      + `?orderBy="id"&startAt=${id}`)
      .pipe(map(rs => {
        const productArr: Product[] = [];
        for (let key in rs) {
          productArr.push(rs[key]);
        }
        return productArr;
      })
    );
  }
  
  // deprecated
  getKey(id: number) {
    return this.http.get(db.url + "products.json"
      + `?orderBy="id"&startAt=${id}`)
      .pipe(map(rs => {
        for (let key in rs) {
          return key;
        }
        return "failed";
      }));
  }

  deleteProductById(id: number) {
    return this.http.get(db.url + "products.json"
      + `?orderBy="id"&startAt=${id}`).pipe(
        concatMap(data => {
          let key: String = "notAKey";
          for (let i in data) {
            key = i;
          }
          return this.http.delete(`${db.url}products/${key}.json`);
        })
      )
  }

  // This is wrong, I will update it at some point I think
  updateProduct(product: Product) {
    return this.http.put(db.url + "products.json", product);
  }
}
