import { Component, OnInit } from '@angular/core';

import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SeanceService } from "../../services/seance.service";
 
import { Modulee } from "../../models/modulee";
import { Seance } from "../../models/seance";
import { ModuleeService } from "../../services/modulee.service"
import { Router ,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-modif-seance',
  templateUrl: './modif-seance.component.html',
  styleUrls: ['./modif-seance.component.css']
})
export class ModifSeanceComponent implements OnInit {
  elements: Modulee[];
  module:Modulee=new Modulee();
  seance:Seance=new Seance();
  modifSe: FormGroup; 
  seanceR:Seance=new Seance();
codeS:string;
isRattrapage=false;
isNotRattrapage=false;
  constructor(
    public seanceService: SeanceService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    public moduleeService: ModuleeService,
    private router: Router,
    private actRouter: ActivatedRoute

  ) { 
    let formControls = {
      codeS: new FormControl('', Validators.required),
      heureDeb: new FormControl('', Validators.required),
      heureFin: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      jour: new FormControl('', Validators.required),
      codeM: new FormControl('', Validators.required),
    };
    this.modifSe = this.fb.group(formControls);
    this.codeS = this.actRouter.snapshot.params.seanceid;
  }

  ngOnInit(): void {
    this.getAllModulee(); 
    this.getSeance();
  }

  onModifClick(): void{
    this.modifSe.value.codeS=this.codeS;
    this.seance.codeS=this.modifSe.value.codeS;
    this.seance.date=this.modifSe.value.date;
    this.seance.heureDeb=this.modifSe.value.heureDeb;
    this.seance.heureFin=this.modifSe.value.heureFin;
    this.seance.jour=this.modifSe.value.jour;
    this.seance.type=this.modifSe.value.type;

    this.getModule(this.modifSe.value.codeM);
    this.seance.module=this.module;
  
    
    console.warn(this.seance);
    
    this.seanceService.updateSeance(this.seance).subscribe(
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
                this.router.navigate(['/home/seances']);
              
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

  onChanged(value: any) {
  
    if (value.startsWith("rattrapage")) {
      this.isRattrapage = true;
      this.isNotRattrapage=false;
   }
   if (!value.startsWith("rattrapage")) {
    this.isNotRattrapage=true;
    this.isRattrapage=false;
 }
  }

  getAllModulee() {
    
    this.moduleeService
      .getAllModule()
      .subscribe((data) => {
        if (data) {
          console.warn(data);
          this.elements = data;
        }

      });
  }
getModule(codem){
  this.moduleeService.getModule(codem).subscribe((data) => {
    if (data) {
    this.module.codeM=data.codeM;
    this.module.niveau=data.niveau;
    this.module.nomM=data.nomM;
    this.module.semestre=data.semestre;

     console.log(this.module);
     
      
    }

  });
  
}
getSeance(){
  this.seanceService.getSeance(this.codeS).subscribe(
    (data) => {
    

      if (data) {
        console.warn(data);
      this.seanceR=data;

      }
    },
    (ex) => {
      console.log(ex);
      this.toastr.warning("Erreur", "", { timeOut: 3000 });
    }
  );
}

}
