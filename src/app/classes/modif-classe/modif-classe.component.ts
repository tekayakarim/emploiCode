import { Component, OnInit , Input} from '@angular/core';

import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClasseService } from "../../services/classe.service";
import { Classe } from "../../models/classe";
import { Router ,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-modif-classe',
  templateUrl: './modif-classe.component.html',
  styleUrls: ['./modif-classe.component.css']
})
export class ModifClasseComponent implements OnInit {
  codeC:string;
  modifCl: FormGroup;
  classe: Classe=new Classe();
  constructor(
    public classeService: ClasseService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private actRouter: ActivatedRoute
  ) {
    let formControls = {
      niveauC: new FormControl('', Validators.required),
     
    };
    this.modifCl = this.fb.group(formControls);

    this.codeC = this.actRouter.snapshot.params.classeid;

   }

  ngOnInit(): void {
    this.getClasse();
  }

  onModifClick(): void{
 this.modifCl.value.codeC=this.codeC;
     
    this.classeService.updateClasse(this.modifCl.value).subscribe(
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
                this.router.navigate(['home/classes']);
              
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
  getClasse(){
    console.warn();
    
    this.classeService.getClasse(this.codeC).subscribe(
      (data) => {
      

        if (data) {
          console.warn(data);
        this.classe=data;

        }
      },
      (ex) => {
        console.log(ex);
        this.toastr.warning("Erreur", "", { timeOut: 3000 });
      }
    );
  }
}
