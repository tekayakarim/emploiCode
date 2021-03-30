import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from "src/app/services/token-storage.service";
import { JwtHelperService } from "@auth0/angular-jwt";
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
   isAdmin = false ; 
   isReclamant = false ; 

   jwtHelper = new JwtHelperService();
  constructor( private tokenStorage: TokenStorageService) { }

  roles ="";
  username: String;
  
  ngOnInit(): void {
   if (this.tokenStorage.getToken() != null) {

     let user = this.jwtHelper.decodeToken(this.tokenStorage.getToken());
     this.roles = user.roles[0].authority;
     this.username = user.sub;
   }
 }


}
