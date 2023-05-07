import { Component } from '@angular/core';

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
export class HomepageComponent {
  constructor (
    private productdb: ProductdbService,
    private accountdb: AccountdbService,
    private orderdb: OrderdbService,
  ) {}

  
}
