import { Component, OnInit } from '@angular/core'; 
import { ToastrService } from 'ngx-toastr';
import { ApiSeancesService } from '../services/api-seance.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-seances',
  templateUrl: './seances.component.html',
  styleUrls: ['./seances.component.css']
})
export class SeancesComponent implements OnInit {
  reponses:any = [];
  modalContent:undefined ;
  idU:number; 
  isReclamant:boolean = false  ; 
  constructor(private service:ApiSeancesService, private toastr: ToastrService, 
    private modalService: NgbModal, private router:Router){
   this.idU = parseInt(localStorage.getItem("userID"));
  }
  onDeleteClick(): void{
    // Delete workspace here

  }
  ngOnInit(): void { 
    
  }
 


}
