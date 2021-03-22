import { Component, OnInit } from '@angular/core'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiEnseignantService } from '../../services/api-enseignant.service';
@Component({
  selector: 'app-enseignants',
  templateUrl: './enseignants.component.html',
  styleUrls: ['./enseignants.component.css']
})
export class EnseignantsComponent implements OnInit {
  appels:any = [];
  idU : number ; 
  modalContent:undefined ;
  constructor(private service:ApiEnseignantService, private toastr: ToastrService, private modalService: NgbModal){
    console.log("user ID : "+localStorage.getItem("userID"));
    this.idU = parseInt(localStorage.getItem("userID"));
  }
  onDeleteClick(): void{
    // Delete workspace here

  }
  ngOnInit(): void {  
    
  }
 

 
  openModal(targetModal, enseignants) {
    this.modalContent = enseignants; 
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
    
   }
 
   
}
  