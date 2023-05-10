import { Component, Input, OnInit } from '@angular/core';

import { Product } from '../product';
import { Category } from '../Category';
import { Account } from '../account';
import { Order } from '../order';

import { ProductdbService } from '../productdb.service';
import { AccountdbService } from '../accountdb.service';
import { OrderdbService } from '../orderdb.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-horiz',
  templateUrl: './product-horiz.component.html',
  styleUrls: ['./product-horiz.component.css']
})
export class ProductHorizComponent implements OnInit {
  @Input() quantity: number = 2;
  @Input() productKey: string = "";
  product: Product = {
    title: "--------",
    description: "--------",
    id: -1,
    category: Category.blank,
    image: "",
    price: -1,
    rating: {
      rate: 0,
      count: 0
    }
  }

  quantityControl = new FormControl('', { validators: [Validators.pattern(/^[1-9]\d*$/)], updateOn: "change"});

  constructor(
    private productdb: ProductdbService,
    private accountdb: AccountdbService,
    private orderdb: OrderdbService,
  ) { }

  ngOnInit(): void {
    this.productdb.getProductByKey(this.productKey).subscribe(product => {
      this.product = product;
    });
  }

  updateQuantity(quantity: string) {
    this.quantity = parseInt(quantity);
  }
}
