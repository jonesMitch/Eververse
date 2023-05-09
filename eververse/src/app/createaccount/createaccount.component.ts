import { Component, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors, FormControl, Validators } from '@angular/forms';

import { AccountdbService } from '../accountdb.service';
import { Account } from '../account';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {
  emails: string[] = new Array(); // all emails
  hidePassword: boolean = true;
  
  emailControl = new FormControl('', { validators: [Validators.email, Validators.required, emailValidator(this.emails)], updateOn: "change" });
  fNameControl = new FormControl('', { validators: [Validators.required] });
  lNameControl = new FormControl('', { validators: [Validators.required] });
  passwordControl = new FormControl('', { validators: [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)], updateOn: "change" });

  constructor(
    private accountdb: AccountdbService,
  ) { }

  ngOnInit(): void {
    this.accountdb.getAccounts().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        // I know this is a terrible idea
        this.emails.push(data[i].email);
      }
    });
  }

  getEmailError(): string {
    if (this.emailControl.hasError("email")) {
      return "Invalid email address"
    } else if (this.emailControl.hasError("required")) {
      return "";
    } 
    return "An account already exists for this email";
  }

  getFNameError(): string {
    if (this.fNameControl.hasError("required")) {
      return "";
    } 
    return "Invalid first name";
  }

  getLNameError(): string {
    if (this.lNameControl.hasError("required")) {
      return "";
    }
    return "Invalid last name";
  }

  getPasswordError(): string {
    if (this.passwordControl.hasError("pattern")) {
      return "Invalid password";
    } else if (this.passwordControl.hasError("required")) {
      return "";
    }
    return "Test";
  }

  submit(email: string, fName: string, lName: string, password: string) {
    let newAccount: Account = {
      email: email,
      fName: fName.toLowerCase(),
      lName: lName.toLowerCase(),
      password: password,
    }

    this.accountdb.setSignedIn(newAccount);
    this.accountdb.addAccount(newAccount).subscribe();
  }
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