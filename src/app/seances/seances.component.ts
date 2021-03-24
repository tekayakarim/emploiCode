import { Component, OnInit } from '@angular/core'; 
import { ToastrService } from 'ngx-toastr';
import { ApiSeancesService } from '../services/api-seance.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { Seance } from "../models/seance";
import { SeanceService } from "../services/seance.service";
@Component({
  selector: 'app-seances',
  templateUrl: './seances.component.html',
  styleUrls: ['./seances.component.css']
})
export class SeancesComponent implements OnInit {

  elements: Seance[];


  reponses:any = [];
  modalContent:undefined ;
  idU:number; 
  isReclamant:boolean = false  ; 
  constructor(private service:ApiSeancesService, private toastr: ToastrService, 
    private modalService: NgbModal, private router:Router
    , public seanceService: SeanceService){
   this.idU = parseInt(localStorage.getItem("userID"));
  }
  onDeleteClick(): void{
    // Delete workspace here

  }
  ngOnInit(): void { 
    this.getAllSeance();
  }
 
  getAllSeance() {
    
    this.seanceService
      .getAllSeance()
      .subscribe((data) => {
        if (data) {
          console.warn(data);
          this.elements = data;
        }

      });
  }


}
