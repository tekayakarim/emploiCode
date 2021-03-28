import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  loggedIn = new BehaviorSubject<boolean>(false);

  constructor() { }

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  signOut() {
    window.sessionStorage.clear();
    window.sessionStorage.removeItem(TOKEN_KEY);
    this.loggedIn.next(false);

  }

  public saveToken(token: string):void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    let token:string = sessionStorage.getItem(TOKEN_KEY);
    if(token!=null){
      this.loggedIn.next(true)
    }
      return token;
    }



  /*public saveUser(user):void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }*/
user:User= new User();
  public getUser():User {
    if (this.getToken()!=null) {

    }
    let jwtHelper = new JwtHelperService();
let user = jwtHelper.decodeToken(this.getToken());
this.user.emailUser=user.sub;
this.user.roles=user.roles;
    return this.user;
  }
}
