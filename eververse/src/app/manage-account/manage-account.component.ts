import { Component, OnInit } from '@angular/core';

import { AccountdbService } from '../accountdb.service';
import { OrderdbService } from '../orderdb.service';
import { ProductdbService } from '../productdb.service';

import { Account } from '../account';
import { Order } from '../order';
import { Product } from '../product';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {
  account: Account = {
    email: "error",
    fName: "error",
    lName: "error",
    password: "error"
  }

  editFName: boolean = false;
  editLName: boolean = false;
  editEmail: boolean = false;
  editPassword: boolean = false;

  constructor(
    protected accountdb: AccountdbService,
    private orderdb: OrderdbService,
    private productdb: ProductdbService,
  ) { }

  ngOnInit(): void {
    let acc: Account = {
      email: "mitch.jones@ndsu.edu",
      fName: "mitch",
      lName: "jones",
      password: "Testing123"
    }
    this.accountdb.setSignedIn(acc);
    console.log("Set account");
    this.loadAccountInfo();
  }

  loadAccountInfo(): void {
    let temp: Account | null = this.accountdb.getSignedIn();
    if (temp === null) {
      console.log("Fuck");
      this.account =  {
        fName: "error",
        lName: "error",
        email: "error",
        password: "error"
      }
    } else {
      console.log("Here");
      this.account =  temp;
    }
  }
}
