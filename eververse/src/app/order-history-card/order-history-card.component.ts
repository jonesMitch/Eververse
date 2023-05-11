import { Component, Input, OnInit } from '@angular/core';

import { Product } from '../product';
import { Order } from '../order';

import { ProductdbService } from '../productdb.service';

@Component({
  selector: 'app-order-history-card',
  templateUrl: './order-history-card.component.html',
  styleUrls: ['./order-history-card.component.css']
})
export class OrderHistoryCardComponent implements OnInit {
  @Input() order: Order = {
    account: "",
    date: 0,
    items: new Array()
  }
  @Input() orderNumber: number = 1;

  items: Product[] = new Array();
  totalPrice: number = 0;

  constructor(
    private productdb: ProductdbService,
  ) { }

    ngOnInit(): void {
      for (let item of this.order.items) {
        if (item !== "temp") {
          this.productdb.getProductByKey(item).subscribe(product => {
            this.items.push(product);
            this.totalPrice += product.price;
          });
        }
      }
    }

    getDate(): string {
      var date = new Date(this.order.date);
      return date.toLocaleDateString();
    }
}
