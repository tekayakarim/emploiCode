import { Component, OnInit } from '@angular/core'; 
import { ToastrService } from 'ngx-toastr';
import { ApiEtudiantService } from '../../services/api-etudiant.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.css']
})
export class EtudiantsComponent implements OnInit {
  reponses:any = [];
  modalContent:undefined ;
  idU:number; 
  isReclamant:boolean = false  ; 
  constructor(private service:ApiEtudiantService, private toastr: ToastrService, 
    private modalService: NgbModal, private router:Router){
   this.idU = parseInt(localStorage.getItem("userID"));
  }
  ngOnInit(): void {  
    //this.getMesClasses();
  }
  onDeleteClick(): void{
    // Delete workspace here

  }

  //getMesClasses(){ 
   // this.service.allClasses(this.idU).subscribe(data=>{ 
    //  if(data['RESPONSE']!="ERREUR"){this.recs = data;  } 
  //  },error=>{
    //  console.log("Error : "+error);
   // });
 // }




 
   
}
  