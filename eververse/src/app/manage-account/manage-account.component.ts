import { Component, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors, FormControl, Validators } from '@angular/forms';

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
  emails: string[] = new Array();

  hidePassword: boolean = true;

  account: Account = {
    email: "--------------------",
    fName: "-------",
    lName: "-------",
    password: "--------"
  }

  // 0 = fName, 1 = lName, 2 = email, 3 = password
  entries: string[] = ["", "", "", ""];

  editFName: boolean = false;
  editLName: boolean = false;
  editEmail: boolean = false;
  editPassword: boolean = false;

  fNameControl = new FormControl('', { validators: [Validators.pattern(/^[a-zA-Z]+$/)], updateOn: "change"});
  lNameControl = new FormControl('', { validators: [Validators.pattern(/^[a-zA-Z]+$/)], updateOn: "change"});
  emailControl = new FormControl('', { validators: [Validators.email, emailValidator(this.emails)], updateOn: "change"});
  passwordControl = new FormControl('', { validators: [Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)], updateOn: "change"});

  constructor(
    protected accountdb: AccountdbService,
    private orderdb: OrderdbService,
    private productdb: ProductdbService,
  ) { }

  ngOnInit(): void {
    this.accountdb.getAccounts().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        // I know this is a terrible idea
        this.emails.push(data[i].email);
      }
    })
    this.loadAccountInfo();
  }

  loadAccountInfo(): void {
    this.accountdb.getSignedIn2().subscribe(account => {
      if (account !== null) {
        this.account = account;
      }
    });
  }

  save2(id: number) {
    let updateAccount: Account = {
      fName: "",
      lName: "",
      email: "",
      password: ""
    }

    if (id === 0) {
      this.editFName = !this.editFName;
      updateAccount.fName = this.entries[id].toLowerCase();
    } else if (id === 1) {
      this.editLName = !this.editLName;
      updateAccount.lName = this.entries[id].toLowerCase();
    } else if (id === 2) {
      this.editEmail = !this.editEmail;
      updateAccount.email = this.entries[id];
    } else {
      this.editPassword = !this.editPassword;
      updateAccount.password = this.entries[id];
    }
    this.entries[id] = "";
    this.accountdb.updateAccount(this.account.email, updateAccount).subscribe(_ => {
      this.loadAccountInfo();
    });
  }

  // id = 0: fName, id = 1: lname, id = 2: email, id = 3: password
  // deprecated
  save(id: number) {
    let updateAccount: Account = {
      fName: id===0?this.entries[0].toLowerCase():"",
      lName: id===1?this.entries[1].toLowerCase():"",
      email: id===2?this.entries[2]:"",
      password: id===3?this.entries[3]:"",
    }
    this.accountdb.updateAccount(this.account.email, updateAccount).subscribe();
    this.accountdb.setSignedIn(updateAccount);
    this.loadAccountInfo();
  }
  nothing() { }
}

/* I know this is a bad idea, I should just be querying the database for the specific email
 * to test instead of loading all emails from the database and parsing through them, 
 * but I'm running out of time so this is how I'm doing it
 */
export function emailValidator(emails: string[]) {
  return (control: AbstractControl): ValidationErrors | null => {
    let emailCheck: boolean = false;
    for (let i = 0; i < emails.length; i++) {
      if (control.value === emails[i]) {
        emailCheck = true;
      }
    }
    return emailCheck ? { testName: { value: control.value } } : null;
  }
}