import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClasseService } from "../../services/classe.service";
@Component({
  selector: 'app-add-classe',
  templateUrl: './add-classe.component.html',
  styleUrls: ['./add-classe.component.css']
})
export class AddClasseComponent implements OnInit {

  addCl: FormGroup;

  constructor(
    public classeService: ClasseService,
    private toastr: ToastrService,
    private fb: FormBuilder

  ) { 

    let formControls = {
      codeC: new FormControl('', Validators.required),
      niveauC: new FormControl('', Validators.required),
     
    };
    this.addCl = this.fb.group(formControls);
  }
 
  ngOnInit(): void {
  }

  onAddClick(): void{
    this.classeService.createClasse(this.addCl.value).subscribe(
      (data) => {
      

        if (data) {
          console.warn(data);
          let text = data;
          if (text.includes("fail")) {
            this.toastr
              .warning(data, "", {
                timeOut: 5000,
              })
              .onHidden.subscribe(() => {});
          } else {
            this.toastr
              .success("" + text , "", {
                timeOut: 1000,
              })
              .onHidden.subscribe(() => {
               window.location.reload();
              
              });
              
          }
        }
      },
      (ex) => {
        console.log(ex);
        this.toastr.warning("Erreur", "", { timeOut: 3000 });
      }
    );
  } 
}
