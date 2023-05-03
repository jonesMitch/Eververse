import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from './Product';
import { Category } from './Category';
import { db } from './settings';

@Injectable({
  providedIn: 'root'
})
export class ProductdbService {

  constructor(
    private http: HttpClient,
  ) { }

  addProduct(newProduct: Product) {
    console.log("POSTed");
    return this.http.post(db.url + "people.json", newProduct.getJson3(), { responseType: "json" } );
  }

  getProduct() {
    return this.http.get<string[]>(db.url + "people/person2.json");
  }
}
