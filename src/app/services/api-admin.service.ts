import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiAdminService {
  urlAPI = "http://localhost/api_polytech/"; 
  constructor(private http: HttpClient) { }

  verifUser(mail, pass){
    let body = {email:mail, password:pass};
    return this.http.post(this.urlAPI+"login.php", body);
  }

 
  isLoggedIn(){ 
    let token = localStorage.getItem("myToken"); 
    if (token) {
      return true ;
    } else {
      return false;
    }
  }
}
