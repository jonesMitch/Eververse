import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Account } from '../account';
import { AccountdbService } from '../accountdb.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  invalidAccount: boolean = false;
  hidePassword: boolean = true;

  emailControl = new FormControl('', { validators: [Validators.email, Validators.required], updateOn: "change" });
  passwordControl = new FormControl('', { validators: [Validators.required], updateOn: "change" });

  constructor (
    private accountdb: AccountdbService,
    private router: Router,
  ) { }

  getEmailError(): string {
    if (this.emailControl.hasError("email")) {
      return "Invalid email address";
    } else {
      return "";
    }
  }
  getPasswordError(): string {
    return "";
  }

  createAccount(email: string, password: string): void {
    let acc: Account | null = null;
    this.accountdb.getAccountByEmail(email).subscribe(data => {
      acc = data[0]===undefined?null:data[0];
      if (acc !== null) {
        if (password === acc.password) {
          this.accountdb.setSignedIn2(acc).subscribe();
          this.router.navigate(['/homepage']);
        }
        this.invalidAccount = true;
      }
      else {
        this.invalidAccount = true;
      }
    });
  }
}
