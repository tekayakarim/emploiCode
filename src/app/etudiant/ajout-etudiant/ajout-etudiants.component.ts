import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router'; 
import { Appel } from '../../models/appel';
import { ApiEtudiantService } from '../../services/api-etudiant.service';


@Component({
  selector: 'app-ajout-etudiants',
  templateUrl: './ajout-etudiants.component.html',
  styleUrls: ['./ajout-etudiants.component.css']
})
export class AjoutEtudiantComponent implements OnInit {
  addAPP: FormGroup ;
  idR : number  ;
  constructor(private apiService:ApiEtudiantService, private toastr: ToastrService, private router:Router, 
    private fb: FormBuilder, private activateRouter:ActivatedRoute) { 

    let formControls = { 
      contenue: new FormControl('', Validators.required )  
    } 
    this.addAPP = this.fb.group(formControls)
  }
 
 

  ngOnInit(): void {
    this.activateRouter.queryParams 
      .subscribe(params => {
        console.log(params); // { order: "popular" } 
        this.idR = params.id;
        console.log("Etudiants ----> "+this.idR); // popular
      }
    );
  }

  saveAppel(){
    let data = this.addAPP.value;  
    let rep = new Appel(null, null, data.contenue,   this.idR);
    this.apiService.addEtudiant(rep).subscribe(data=>{
      console.log("RES : "+data);
      if(data['RESPONSE']=="ERROR"){ 
        this.toastr.error('Erreur d\'envoie', 'Error',{timeOut: 2000});
      }else {   
        this.toastr.success('Etudiant ajoutée avec succès', 'Succès',{timeOut: 2000});
        this.router.navigate(['/'])
      }
  }, error=>console.log("ERROR : "+error)); 
  }

}
