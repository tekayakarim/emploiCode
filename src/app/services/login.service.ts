import { Injectable } from '@angular/core';
import {HttpClient ,HttpParams, HttpHeaders} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { User } from "src/app/models/user";
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  URL = 'http://localhost:9000/auth';
  loggedIn = new BehaviorSubject<boolean>(false);
  httpOptions = {
 headers: new HttpHeaders({ 'Content-Type': 'application/json' })
 };

 constructor(private httpClient: HttpClient) {}

 get isLoggedIn() {
   return this.loggedIn.asObservable(); // {2}
 }

 public login(credentials): Observable<any> {
   this.loggedIn.next(true);
return this.httpClient.post(this.URL+'/signin',{
  userName: credentials.userName,
  password: credentials.password
}, this.httpOptions);
}
/**
 * signup
 */
public signup(credentials): Observable<any> {
  return this.httpClient.post(this.URL+'/signup',{
    userName: credentials.mail,
    password: credentials.password,
    nom: credentials.nom,
    prenom: credentials.prenom,
    tel:credentials.tel,
    email:credentials.mail,
    groupe:credentials.group,
    role:credentials.role
  }, this.httpOptions);
}

}
