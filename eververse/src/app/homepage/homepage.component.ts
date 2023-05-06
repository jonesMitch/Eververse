import { Component } from '@angular/core';

import { ProductdbService } from '../productdb.service';
import { AccountdbService } from '../accountdb.service';

import { Product } from '../product';
import { Category } from '../Category';
import { Account } from '../account';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  constructor (
    private productdb: ProductdbService,
    private accountdb: AccountdbService,
  ) {}

  accounts: Account[] = new Array();
  test: Account = {
    email: "placeholder",
    password: "placeholder", 
    fName: "placeholder",
    lName: "placeholder"
  }

  addAccount() {
    let newAcc = {
      email: "ebray@bray.tech",
      password: "asdf1234",
      fName: "Elsie",
      lName: "Bray",
    }
    this.accountdb.addAccount(newAcc).subscribe();
  }

  getAccounts() {
    this.accountdb.getAccounts().subscribe(data => {
      console.log(data[0]);
    })
  }

  getAccount(email: string) {
    this.accountdb.getAccountByEmail(email).subscribe(data => {
      this.test = data[0];
    })
  }

  updateAccount() {
    let old: Account = {
      email: "abray@bray.tech",
      password: "asdf1234",
      fName: "Elsie",
      lName: "Bray",
    }
    let update: Account = {
      email: "abray@bray.tech",
      password: "asdf1234",
      fName: "Clovis",
      lName: "Bray",
    }
    this.accountdb.updateAccount("abray@bray.tech", update).subscribe();
  }
}
