import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import { Product } from './Product';
// import { Product } from './product2';
import { Product } from './product3';
import { Category } from './Category';
import { db } from './settings';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductdbService {

  constructor(
    private http: HttpClient,
  ) { }

  addProduct(newProduct: Product) {
    console.log("POSTed");
    return this.http.post(db.url + "products.json", newProduct);
  }

  getProducts():  Observable<Product[]> {
    return this.http.get<Product[]>(db.url + "products.json")
      .pipe(map(rs => {
        const peopleArr: Product[] = [];
        for (let key in rs) {
          peopleArr.push(rs[key]);
        }
        return peopleArr;
      }));
  }
}
