import { Component, OnInit } from '@angular/core'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiEnseignantService } from '../../services/api-enseignant.service';

import { User } from "../../models/user";
import { EnseignantService } from "../../services/enseignant.service";
@Component({
  selector: 'app-enseignants',
  templateUrl: './enseignants.component.html',
  styleUrls: ['./enseignants.component.css']
})
export class EnseignantsComponent implements OnInit {
  appels:any = [];
  idU : number ; 
  modalContent:undefined ;

  elements: User[];
  constructor(private service:ApiEnseignantService, private toastr: ToastrService, private modalService: NgbModal
    , public enseignantService: EnseignantService){
    console.log("user ID : "+localStorage.getItem("userID"));
    this.idU = parseInt(localStorage.getItem("userID"));
  }
  onDeleteClick(): void{
    // Delete workspace here

  }
  ngOnInit(): void {  
   this. getAllEnseignant(); 
  }
 

 
  openModal(targetModal, enseignants) {
    this.modalContent = enseignants; 
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
    
   }
 
   getAllEnseignant() {
    
    this.enseignantService
      .getAllEnseignant()
      .subscribe((data) => {
        if (data) {
          console.warn(data);
          this.elements = data;
        }

      });
  }
   
}
  