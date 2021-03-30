import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ApiAdminService } from '../services/api-admin.service';
import { Router } from '@angular/router';

import { TokenStorageService } from "src/app/services/token-storage.service";
import { JwtHelperService } from "@auth0/angular-jwt";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userNP: string;
  role: string; 
  jwtHelper = new JwtHelperService();
  constructor(
    @Inject(DOCUMENT) private document: any,
    private service: ApiAdminService,
    private router: Router,

    private tokenStorage: TokenStorageService
  ) {}
  elem;
  isLoggedIn: Boolean;

  ngOnInit(): void {
    if (this.tokenStorage.getToken() != null) {

      let user = this.jwtHelper.decodeToken(this.tokenStorage.getToken());
      this.role = user.roles[0].authority;
      this.userNP = user.sub;
      if (this.role == "ROLE_ETUDIANT" ) {
        this.role="Etudiant"
      }
      if (this.role == "ROLE_CHEFDEPARTEMENT") {
        this.role="Chef Departement"
      }
      if (this.role == "ROLE_ENSEIGNANT") {
        this.role="Enseignant"
      }
    }
  /*  this.userNP = localStorage.getItem('userNP');
    this.role = localStorage.getItem('roleUser');
    this.elem = document.documentElement;
    this.isLoggedIn = this.service.isLoggedIn();*/
  }

  quitter() {
    localStorage.removeItem('userID');
    localStorage.removeItem('userNP');
    localStorage.removeItem('myToken');
    localStorage.removeItem('roleUser');
    localStorage.clear();
    this.router.navigate(['/']);
  }

  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

////new
  leave() {
    this.tokenStorage.signOut();
    this.router.navigateByUrl("login");
   
  //  console.warn(this.tokenStorageService.getUser());
  }
}
