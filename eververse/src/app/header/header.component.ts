import { Component, OnInit, Input } from '@angular/core';

import { Category } from '../Category';
import { Account } from '../account';
import { Order } from '../order';
import { Product } from '../product';

import { AccountdbService } from '../accountdb.service';
import { OrderdbService } from '../orderdb.service';
import { ProductdbService } from '../productdb.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() cartLength: number = 0;

  searchBorderColor: string = "transparent";

  account: Account | null = null;

  constructor(
    private accountdb: AccountdbService,
    private orderdb: OrderdbService,
    private productdb: ProductdbService,
  ) { }

  ngOnInit(): void {
    this.getSignedIn();

    this.orderdb.cartQuantity$.subscribe(data => {
      this.cartLength++;
    })
  }

  getSignedIn(): void {
    this.accountdb.getSignedIn2().subscribe(account => {
      if (account === undefined) {
        this.account = null;
      }
      else {
        this.account = account;
      }
      this.checkCart();
    });
  }

  checkCart(): void {
    if (this.account !== null) {
      this.orderdb.getCartFromEmail(this.account.email).subscribe(data => {
        if (data === undefined && this.account !== null) {
          this.orderdb.addCart(this.account.email).subscribe();
          this.cartLength = 0;
        }
        else if (this.account !== null) {
          this.orderdb.getCartFromEmail(this.account.email).subscribe(cart => {
            this.cartLength = cart.items.length - 1;
          })
        }
      })
    }
  }

  incrementCartLength(): void { 
    console.log("Increment");
    this.cartLength++; 
  }

  signOut(): void {
    this.accountdb.setSignedIn(null);
  }

  searchFocus(): void {
    this.searchBorderColor = "#f5cf3d";
  }
  searchBlur(): void {
    this.searchBorderColor = "transparent";
  }
}
