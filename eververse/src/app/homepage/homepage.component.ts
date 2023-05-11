import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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
export class HomepageComponent implements OnInit {
  products: Product[] = new Array();
  account: Account | null = null;

  noProducts: boolean = false;
  featured: boolean = true;
  searchString: string = "";

  constructor (
    private productdb: ProductdbService,
    private accountdb: AccountdbService,
    private orderdb: OrderdbService,
  ) {}

  ngOnInit(): void {
    this.getFeaturedProducts();

    this.productdb.products$.subscribe(productArr => {
      if (productArr === null) {
        this.noProducts = false;
        this.featured = true;
        this.getFeaturedProducts();
      } else {
        this.products = productArr;
        if (this.products.length === 0) {
          this.noProducts = true;
          this.featured = false;
        } else {
          this.noProducts = false;
          this.featured = false;
          this.productdb.searchString$.subscribe(searchString => {
            this.searchString = searchString;
          })
        }
      }
    });
  }

  getFeaturedProducts(): void {
    this.productdb.getProducts().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.products.push(data[i]);
      }
    });
    this.getSignedIn();
  }

  getSignedIn(): void {
    this.accountdb.getSignedIn2().subscribe(account => {
      if (account === undefined) {
        this.account = null;
      }
      else {
        this.account = account;
      }
    });
  }
}
