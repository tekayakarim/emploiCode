import { Component, OnInit } from '@angular/core'; 
import { ToastrService } from 'ngx-toastr';
import { ApiModulesService } from '../services/api-modules.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { Modulee } from "../models/modulee";
import { ModuleeService } from "../services/modulee.service";
@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']
})
export class ModulesComponent implements OnInit {

  elements: Modulee[];

    reponses:any = [];
    modalContent:undefined ;
    idU:number; 

    constructor( public moduleeService: ModuleeService){ 
      
     }

    onDeleteClick(): void{
      // Delete workspace here
  
    }
    ngOnInit(): void { 
     this.getAllModulee(); 
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
    

  
 
  
  
     
     
  }
  