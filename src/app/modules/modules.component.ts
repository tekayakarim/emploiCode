import { Component, OnInit } from '@angular/core'; 
import { ToastrService } from 'ngx-toastr';
import { ApiModulesService } from '../services/api-modules.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']
})
export class ModulesComponent implements OnInit {
    reponses:any = [];
    modalContent:undefined ;
    idU:number; 
    onDeleteClick(): void{
      // Delete workspace here
  
    }
    ngOnInit(): void { 
      
    }
   
   
    

  
 
  
  
    
     
  }
  