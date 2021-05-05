import { Component, OnInit } from '@angular/core';

import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { LoginService } from "src/app/services/login.service";

@Component({
  selector: 'app-add-etudiant',
  templateUrl: './add-etudiant.component.html',
  styleUrls: ['./add-etudiant.component.css']
})
export class AddEtudiantComponent implements OnInit {
  addUSR: FormGroup;
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder,

    private loginService: LoginService
  ) {
    let formControls = {
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      tel: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.minLength(8),
        Validators.maxLength(8)
      ]),
      mail: new FormControl('', [Validators.required, Validators.email]),
      groupe: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    };
    this.addUSR = this.fb.group(formControls);
   }

  ngOnInit(): void {
  }

  get nom() {
    return this.addUSR.get('nom');
  }
  get prenom() {
    return this.addUSR.get('prenom');
  }
  get tel() {
    return this.addUSR.get('tel');
  }
  get mail() {
    return this.addUSR.get('mail');
  }
  get groupe() {
    return this.addUSR.get('groupe');
  }
  get role() {
    return this.addUSR.get('role');
  }
  get password() {
    return this.addUSR.get('password');
  }

  
  signup(){
    console.log(this.addUSR.value);
    
    this.loginService.signup(this.addUSR.value).subscribe(
      (data) => {
        if (data) {
          console.warn(data);
          this.toastr.success("L'utilisateur a été enregistré", "", {
            timeOut: 6000,
          });
          this.router.navigate(['home/etudiants']);
         
        }
      },
      (ex) => {
        console.warn(ex);
        this.toastr.warning("Erreur", "", { timeOut: 3000 });
      }
    );
  }
}
