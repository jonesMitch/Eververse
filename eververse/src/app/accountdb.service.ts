import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Account } from "./account";
import { Signedin } from "./signedin";
import { db } from "./settings";
import { Observable, map, concatMap, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AccountdbService {
  // if null, not signed in // deprecated
  signedIn: Account | null = null;

  private _signedIn = new Subject<boolean>();
  signedIn$ = this._signedIn.asObservable();

  signedInEvent() {
    this._signedIn.next(true);
  }

  constructor(private http: HttpClient) {}

  // assumes the account is in the database, i.e. doesn't verify that it is
  getSignedIn(): Account | null {
    // console.log(this.signedIn);
    return this.signedIn;
  }

  getSignedIn2() {
    return this.http.get<Signedin[]>(db.url + "signedin.json").pipe(
      concatMap(data => {
        let tempArr: Signedin[] = new Array();
        for (let key in data) {
          tempArr.push(data[key]);
        }
        return this.http.get<Account>(`${db.url}accounts/${tempArr[0].key}.json`).pipe(
          map(account => {
            return account;
          })
        )
      })
    )
  }

  // assumes the account is in the database, i.e. doesn't verify that it is
  setSignedIn(acc: Account | null): void {
    this.signedIn = acc;
  }

  setSignedIn3(email: string | null) {
    let temp: Signedin = { key : "null" }

    if (email === null) {
      return this.http.delete(db.url + "signedin.json").pipe(
        concatMap(_ => this.http.post(db.url + "signedin.json", temp))
      )
    } else {
      return this.getAccountKey(email).pipe(
        concatMap(accountKey => {
          return this.http.delete(db.url + "signedin.json").pipe(
            concatMap(_ => {
              temp.key = accountKey;
              return this.http.post(db.url + "signedin.json", temp);
            })
          )
        })
      )
    }
  }

  setSignedIn2(acc: Account | null) {
    let temp: Signedin = { key : "" }

    if (acc === null) {
      return this.http.delete(db.url + "signedin.json").pipe(
        concatMap(nothing => this.http.post(db.url + "signedin.json", temp))
      )
    } else {
      return this.getAccountKey(acc.email).pipe(
        concatMap(data => {
          temp.key = data;
          return this.http.post(db.url + "signedin.json", temp);
        }));
    }
  }

  addAccount(newAccount: Account) {
    return this.http.post(db.url + "accounts.json", newAccount);
  }

  formatName(name: string): string {
    let firstLetter = name[0];
    return firstLetter.toUpperCase() + name.slice(1, name.length);
  }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(db.url + "accounts.json").pipe(
      map((rs) => {
        let accountsArr: Account[] = new Array();
        for (let key in rs) {
          accountsArr.push(rs[key]);
        }
        return accountsArr;
      })
    );
  }

  getAccountByEmail(email: string) {
    return this.http
      .get<Account[]>(
        db.url + "accounts.json" + `?orderBy="email"&equalTo="${email}"`
      )
      .pipe(
        map((rs) => {
          let accountsArr: Account[] = new Array();
          for (let key in rs) {
            accountsArr.push(rs[key]);
          }
          return accountsArr;
        })
      );
  }

  deleteAccount2(email: string) {
    return this.getAccountKey(email).pipe(
      concatMap((data) => this.http.delete(`${db.url}accounts/${data}.json`))
    );
  }

  updateAccount(oldEmail: string, update: Account) {
    let key: string = "notAKey";
    return this.getAccountKey(oldEmail).pipe(
      concatMap((data) => {
        key = data;
        return this.getAccountByEmail(oldEmail).pipe(
          concatMap((data2) => {
            let temp = data2[0];
            const body = {
              email: update.email === "" ? temp.email : update.email,
              password: update.password === "" ? temp.password : update.password,
              fName: update.fName === "" ? temp.fName : update.fName,
              lName: update.lName === "" ? temp.lName : update.lName,
            };
            return this.http.put(`${db.url}accounts/${key}.json`, body);
          })
        );
      })
    );
  }

  getAccountKey(email: string) {
    return this.http
      .get(db.url + "accounts.json" + `?orderBy="email"&equalTo="${email}"`)
      .pipe(
        map((rs) => {
          let key = "notAKey";
          for (let i in rs) {
            key = i;
          }
          return key;
        })
      );
  }
}
