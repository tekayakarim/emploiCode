import { Component, OnInit } from '@angular/core';

import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SeanceService } from "../../services/seance.service";
@Component({
  selector: 'app-add-seance',
  templateUrl: './add-seance.component.html',
  styleUrls: ['./add-seance.component.css']
})
export class AddSeanceComponent implements OnInit {

  addSe: FormGroup;

  constructor(
    public seanceService: SeanceService,
    private toastr: ToastrService,
    private fb: FormBuilder

  ) {

    let formControls = {
      codeS: new FormControl('', Validators.required),
      heureDeb: new FormControl('', Validators.required),
      heureFin: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
    };
    this.addSe = this.fb.group(formControls);
   }
 
  ngOnInit(): void {
  }

  onAddClick(): void{
    this.seanceService.createSeance(this.addSe.value).subscribe(
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
