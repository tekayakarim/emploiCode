import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs'; 
import { ApiAdminService } from './services/api-admin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: ApiAdminService, private router: Router) {

  }

  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let isLoggedIn = this.service.isLoggedIn();

      if (isLoggedIn) {
        return true;
      }else{
        this.router.navigate(['login']);
        return false;
      }
  }
  
}
