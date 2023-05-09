import { Component, OnInit } from '@angular/core';

import { Category } from '../Category';
import { Account } from '../account';
import { AccountdbService } from '../accountdb.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchBorderColor: string = "transparent";

  isSignedIn: boolean = false;

  constructor(
    private accountdb: AccountdbService,
  ) { }

  getName(): string {
    let acc: Account | null = this.accountdb.getSignedIn();
    if (acc === null) {
      this.isSignedIn = false;
      return "Account";
    } else {
      this.isSignedIn = true;
      return this.accountdb.formatName(acc.fName);
    }
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
