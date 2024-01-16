import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currUser: User = { email: '', password: '' };
  private _isLoggedIn:boolean = false;
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this._isLoggedIn$.asObservable();
  userList: User[] = [];

  constructor() { 
    this.isLoggedIn = sessionStorage.getItem('login')==='true';
  }

  get isLoggedIn(){
    return this._isLoggedIn
  }

  set isLoggedIn(flag: boolean){
    this._isLoggedIn = flag;
    this._isLoggedIn$.next(flag);
    sessionStorage.setItem('login', flag.toString());
  }

  checkLoginCred(user: User): boolean {
    if (localStorage.getItem('userDetails')) {
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      const first = userDetails.filter((data: any) => data.email === user.email
      );
      if (first.length > 0 && first.filter((data: any) => data.password === user.password).length > 0) {
        this.isLoggedIn = true;
        return true;
      }
    }
    return false;
  }
  saveRegistrationData(user: User): void {
    if (localStorage.getItem('userDetails')) {
      this.userList = JSON.parse(localStorage.getItem('userDetails'));
    }
    this.userList.push(user);
    localStorage.setItem('userDetails', JSON.stringify(this.userList));
    this.isLoggedIn = true;
  }
}
