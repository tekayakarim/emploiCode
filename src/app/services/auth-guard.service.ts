import { Injectable } from "@angular/core";
import { TokenStorageService } from "./token-storage.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private token: TokenStorageService, private router: Router) {}
  canActivate(): boolean {
    if (this.token.getToken() == "" || this.token.getToken() == null) {
      this.router.navigateByUrl("");
      return false;
    }
    return true;
  }
}
