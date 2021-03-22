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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logForm: FormGroup;
  constructor(
    private apiService: ApiAdminService,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder
  ) {
    let formControls = {
      mail: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    };
    this.logForm = this.fb.group(formControls);
  }

  get mail() {
    return this.logForm.get('mail');
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
    this.apiService.verifUser(data.mail, data.password).subscribe(
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
}
