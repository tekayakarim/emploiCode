import { Component, OnInit } from '@angular/core';

import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SeanceService } from "../../services/seance.service";
import { ClasseService } from "../../services/classe.service";
 
import { Modulee } from "../../models/modulee";
import { Seance } from "../../models/seance";
import { ModuleeService } from "../../services/modulee.service";
import { User } from "../../models/user";
import { Classe } from "../../models/classe";
import { EnseignantService } from "../../services/enseignant.service";
@Component({
  selector: 'app-add-seance',
  templateUrl: './add-seance.component.html',
  styleUrls: ['./add-seance.component.css']
})
export class AddSeanceComponent implements OnInit {
  elementsClasse:Classe[];
  elementsEnsei:User[];
  elements: Modulee[];
  module:Modulee=new Modulee();
  seance:Seance=new Seance();
  enseignant:User=new User();
  classe:Classe=new Classe();
  addSe: FormGroup;
isRattrapage=false;
isNotRattrapage=false;
  constructor(
    public seanceService: SeanceService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    public moduleeService: ModuleeService,
    public enseignantService: EnseignantService,
    public classeService: ClasseService

  ) {

    let formControls = {
      codeS: new FormControl('', Validators.required),
      heureDeb: new FormControl('', Validators.required),
      heureFin: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      jour: new FormControl('', Validators.required),
      codeM: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),
      codeC: new FormControl('', Validators.required),
      numSalle: new FormControl(null, Validators.required),
    };
    this.addSe = this.fb.group(formControls);
   }
 
  ngOnInit(): void {
    this.getAllModulee(); 
    this.getAllEnseignant();
    this.getAllClasse();
  }

  onAddClick(): void{
  
    this.seance.codeS=this.addSe.value.codeS;
    this.seance.date=this.addSe.value.date;
    this.seance.heureDeb=this.addSe.value.heureDeb;
    this.seance.heureFin=this.addSe.value.heureFin;
    this.seance.jour=this.addSe.value.jour;
    this.seance.type=this.addSe.value.type;

    this.getModule(this.addSe.value.codeM);
    this.seance.module=this.module;

    this.getEnseignant(this.addSe.value.id);
    this.seance.enseignant=this.enseignant;

    this.getClasse(this.addSe.value.codeC);
    this.seance.cl=this.classe;
this.seance.numSalle=this.addSe.value.numSalle;
    console.warn(this.seance);
    
    this.seanceService.createSeance(this.seance).subscribe(
      (data) => {
      

        if (data) {
          console.warn(data);
          let text = data;
          if (text.includes("seance")) {
            this.toastr
            .warning(data, "", {
              timeOut: 5000,
            })
            .onHidden.subscribe(() => {});
          }
          else
          if (text.includes("salle")) {
            this.toastr
            .warning(data, "", {
              timeOut: 5000,
            })
            .onHidden.subscribe(() => {});
          }
          else 
          if (text.includes("fail")) {
         
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

getAllEnseignant() {
    
  this.enseignantService
    .getAllEnseignant()
    .subscribe((data) => {
      if (data) {
        console.warn(data);
        this.elementsEnsei = data;
      }

    });
}
getEnseignant(id){
  this.enseignantService.getEnseignant(id).subscribe((data) => {
    if (data) {
    this.enseignant.id=data.id;
    this.enseignant.nomUser=data.nomUser;
    this.enseignant.prenomUser=data.prenomUser;
    this.enseignant.telUser=data.prenomUser;
    this.enseignant.emailUser=data.emailUser;
    this.enseignant.roles=data.roles;
    this.enseignant.userName=data.userName;

     console.log(this.enseignant);
     
      
    }

  });
}
getAllClasse() {
    
  this.classeService
    .getAllClasse()
    .subscribe((data) => {
      if (data) {
        console.warn(data);
        this.elementsClasse = data;
      }

    });
}
getClasse(codeC)
    {
  this.classeService.getClasse(codeC).subscribe((data) => {
    if (data) {
    this.classe.codeC=data.codeC;
    this.classe.niveauC=data.niveauC;
   
     console.log(this.classe);  
    }
    });
  }

}

