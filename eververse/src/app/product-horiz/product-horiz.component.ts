import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Product } from '../product';
import { Category } from '../Category';

import { cartQuantity } from '../cart/cart.component';

import { ProductdbService } from '../productdb.service';
import { OrderdbService } from '../orderdb.service';

@Component({
  selector: 'app-product-horiz',
  templateUrl: './product-horiz.component.html',
  styleUrls: ['./product-horiz.component.css']
})
export class ProductHorizComponent implements OnInit {
  @Input() isOrderHistory: boolean = false;
  closed: boolean = false;

  @Input() quantity: number = 1;
  currentQuantity: number = 2;

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

  @Input() cartInput: cartQuantity = { key: "", quantity: 1, email: "" };
  email: string = "";

  quantityControl = new FormControl('', { validators: [Validators.pattern(/^[1-9]\d*$/), Validators.required], updateOn: "change"});

  constructor(
    private productdb: ProductdbService,
    private orderdb: OrderdbService,
  ) { }

  ngOnInit(): void {
    this.productdb.getProductByKey(this.cartInput.key).subscribe(product => {
      this.product = product;
      this.quantity = this.cartInput.quantity;
      this.currentQuantity = this.quantity;
      this.email = this.cartInput.email;
    })
  }

  updateQuantity(quantity: string) {
    this.quantity = parseInt(quantity);
    let diff = this.currentQuantity - this.quantity;
    this.currentQuantity = this.quantity;
    if (diff > 0) {
      this.orderdb.removeItemFromCart(this.email, this.product.id, diff).subscribe(_ => {
        this.orderdb.changeQuantity(-1 * diff);
      });
      
    } else if (diff < 0) {
      this.orderdb.addProductToCart(this.email, this.product.id, -1*diff).subscribe(_ => {
        this.orderdb.changeQuantity(-1 * diff);
      });
      
    }
    // do nothing if diff is 0
  }

  deleteItem() {
    this.orderdb.removeItemFromCart(this.email, this.product.id, this.currentQuantity).subscribe(_ => {
      this.orderdb.changeQuantity(-1*this.currentQuantity);
    });
    this.closed = true; // if it's a bad idea, but it works, then it's not a bad idea
  }
}
