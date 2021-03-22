import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ApiAdminService } from '../services/api-admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userNP: string;
  role: string;
  constructor(
    @Inject(DOCUMENT) private document: any,
    private service: ApiAdminService,
    private router: Router
  ) {}
  elem;
  isLoggedIn: Boolean;

  ngOnInit(): void {
    this.userNP = localStorage.getItem('userNP');
    this.role = localStorage.getItem('roleUser');
    this.elem = document.documentElement;
    this.isLoggedIn = this.service.isLoggedIn();
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
}
