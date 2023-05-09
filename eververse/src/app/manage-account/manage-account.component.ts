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

  hidePassword: boolean = false;

  account: Account = {
    email: "mitch.jones@ndsu.edu",
    fName: "error",
    lName: "error",
    password: "error"
  }

  // 0 = fName, 1 = lName, 2 = email, 3 = password
  entries: string[] = new Array(4);

  editFName: boolean = false;
  editLName: boolean = false;
  editEmail: boolean = false;
  editPassword: boolean = false;

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

    // let acc: Account = {
    //   email: "mitch.jones@ndsu.edu",
    //   fName: "mitch",
    //   lName: "jones",
    //   password: "Testing123"
    // }
    // this.accountdb.setSignedIn(acc);
    // console.log("Set account");
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

  // id = 0: fName, id = 1: lname, id = 2: email, id = 3: password
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
    console.log(this.account.email);
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