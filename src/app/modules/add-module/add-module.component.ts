import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModuleeService } from "../../services/modulee.service";
@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.css']
})
export class AddModuleComponent implements OnInit {

  addMo: FormGroup;

  constructor(
    public moduleeService: ModuleeService,
    private toastr: ToastrService,
    private fb: FormBuilder

  ) { 
    let formControls = {
      codeM: new FormControl('', Validators.required),
      nomM: new FormControl('', Validators.required),
      niveau: new FormControl('', Validators.required),
      semestre: new FormControl('', Validators.required),
    };
    this.addMo = this.fb.group(formControls);
  }

  ngOnInit(): void {
  }

  onAddClick(): void{
    this.moduleeService.createModule(this.addMo.value).subscribe(
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
