import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ApiAdminService } from '../services/api-admin.service';

import { JwtHelperService } from "@auth0/angular-jwt";
import { LoginService } from "src/app/services/login.service";
import { TokenStorageService } from "src/app/services/token-storage.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logForm: FormGroup;

  submitted = false;
  authError = false;
  isLoggedIn = false;
  errorMessage = "";
  roles = "";
  constructor(
    private apiService: ApiAdminService,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder,

    private loginService: LoginService,
    public tokenStorage: TokenStorageService,
  ) {
    let formControls = {
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    };
    this.logForm = this.fb.group(formControls);
  }

  get userName() {
    return this.logForm.get('userName');
  }
  get password() {
    return this.logForm.get('password');
  }

  ngOnInit(): void {
    let isLoggedIn = this.apiService.isLoggedIn();

    if (isLoggedIn) {
      this.router.navigate(['/home']);
    }

  }

  verifUser() {
    let data = this.logForm.value;
    console.log('dataa : ' + data);
    this.apiService.verifUser(data.userName, data.password).subscribe(
      data => {
        console.log('RESULTAT : ' + data[0]['NOM']);
        let result: any = data[0];
        if (result.ROLE != null) {
          let token = this.randStr(32);
          console.log('TOKEN GENERATED : ' + token);
          localStorage.setItem('userID', result.ID);
          localStorage.setItem('roleUser', result.ROLE);
          localStorage.setItem('userNP', result.NOM + ' ' + result.PRENOM);
          localStorage.setItem('myToken', token);
          this.router.navigate(['/home']);
          this.toastr.success(
            'Bienvenue ' + result.NOM + ' ' + result.PRENOM,
            'Succès',
            { timeOut: 2000 }
          );
        } else {
          this.toastr.error(
            'SVP verifier votre E-mail et mot de passe',
            'Error',
            { timeOut: 2000 }
          );
        }
      },
      error => {
        this.toastr.error('Erreur', 'Error', { timeOut: 2000 });
        console.log('Erreur : ' + error);
      }
    );
  }

  randStr(len) {
    let s = '';
    while (len--)
      s += String.fromCodePoint(Math.floor(Math.random() * (126 - 33) + 33));
    return s;
  }

  get f() {
    return this.logForm.controls;
  }

  ///////////////////////////////////////////////////new
  submitFunction() {
    if (this.f.userName.errors)
      this.toastr.error("Entrer votre nom d'utilisateur");
    if (this.f.password.errors) this.toastr.error("Entrer votre mot de passe");
    else {
      this.submitted = true;
      console.log(this.logForm.value);
      
      let loginData = this.loginService.login(this.logForm.value);
      if (loginData) {
        loginData.subscribe(
          (data) => {
            this.tokenStorage.saveToken(data.accessToken);
            //    this.tokenStorage.saveUser(data);
            this.authError = false;
            this.isLoggedIn = true;

            let jwtHelper = new JwtHelperService();

            this.roles = jwtHelper.decodeToken(
              this.tokenStorage.getToken()
            ).roles[0].authority;

            //      this.roles = this.tokenStorage.getUser().roles;
            console.warn(this.roles);
            if (this.roles == "ROLE_ETUDIANT" || this.roles == "ROLE_ENSEIGNANT") {
              this.router.navigateByUrl("/home/calendrier");
            }
            if (this.roles == "ROLE_CHEFDEPARTEMENT") {
              this.router.navigateByUrl("home");
            }
           

            //  console.warn(this.tokenStorage.getUser());
          },
          (err) => {
            this.errorMessage = err.error.message;
            this.authError = true;
            console.warn(err);
            this.toastr.error("Utilisateur invalide");
          }
        );
      }
    }
  }

}
