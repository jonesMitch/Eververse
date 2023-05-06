import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Account } from './account';
import { db } from './settings';
import { Observable, map, concatMap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountdbService {

  constructor(
    private http: HttpClient,
  ) { }

    addAccount(newAccount: Account) {
      return this.http.post(db.url + "accounts.json", newAccount);
    }

    getAccounts(): Observable<Account[]> {
      return this.http.get<Account[]>(db.url + "accounts.json")
        .pipe(map(rs => {
          let accountsArr: Account[] = new Array();
          for (let key in rs) {
            accountsArr.push(rs[key]);
          }
          return accountsArr;
        }));
    }

    getAccountByEmail(email: string) {
      return this.http.get<Account[]>(db.url + "accounts.json"
        + `?orderBy="email"&equalTo="${email}"`)
        .pipe(map(rs => {
          let accountsArr: Account[] = new Array();
          for (let key in rs) {
            accountsArr.push(rs[key]);
          }
          return accountsArr;
        }))
    }

    deleteAccount(email: string) {
      return this.http.get(db.url + "accounts.json"
        +`?orderBy="email"&startAt="${email}"`).pipe(
          concatMap(data => {
            let key: string = "notAKey";
            for (let i in data) {
              key = i;
            }
            return this.http.delete(`${db.url}accounts/${key}.json`);
          })
        )
    }

    private getAccountKey(email: string) {
      return this.http.get(db.url + "accounts.json"
        + `?orderBy="email"&equalTo="${email}"`)
        .pipe(map(rs => {
          let key = "notAKey";
          for (let i in rs) {
            key = i;
          }
          return key;
        }));
    }

    
    // There's probably a better way to do this, but this works so I don't care
    updateAccount(oldEmail: string, update: Account) {
      let key: string = "notAKey";
      return this.getAccountKey(oldEmail).pipe(
        concatMap(data => {
          key = data;
          return this.getAccountByEmail(oldEmail).pipe(
            concatMap(data2 => {
              let temp = data2[0];
              const body = {
                email : update.email === "" ? temp.email : update.email,
                password : update.password === "" ? temp.password : update.password,
                fName : update.fName === "" ? temp.fName : update.fName,
                lName : update.lName === "" ? temp.lName : update.lName,
              }
              console.log(key);
              return this.http.put(`${db.url}accounts/${key}.json`, body);
            })
          )
        })
      )
    }
}
