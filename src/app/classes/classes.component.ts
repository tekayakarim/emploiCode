import { Component, OnInit } from '@angular/core';
import { ApiClasseService } from 'src/app/services/api-classe.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Classe } from "../models/classe";
import { ClasseService } from "../services/classe.service";
@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  recs:any = [];
  idU:number ; 
  modalContent:undefined ;

  elements: Classe[];

  constructor(private service:ApiClasseService, private toastr: ToastrService, private modalService: NgbModal
   , public classeService: ClasseService){ 
    this.idU = parseInt(localStorage.getItem("userID"));
    console.log("ID USER SESSION : "+this.idU);
  }

  ngOnInit(): void {  
   // this.getMesReclamations();
   this.getAllClasse();
  }
 
  onDeleteClick(): void{
    // Delete workspace here

  }
 



  openModal(targetModal, reclamation) {
    this.modalContent = reclamation; 
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
    
   }
 
   getAllClasse() {
    
    this.classeService
      .getAllClasse()
      .subscribe((data) => {
        if (data) {
          console.warn(data);
          this.elements = data;
        }

      });
  }
   
}
