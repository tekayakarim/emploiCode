import { Component, OnInit , Input} from '@angular/core'; 
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
  @Input("codeM") codeM: string;
  elements: Modulee[];

    reponses:any = [];
    modalContent:undefined ;
    idU:number; 

    constructor( public moduleeService: ModuleeService, private toastr: ToastrService){ 
      
     }

    onDeleteClick(codeM): void{
      this.moduleeService.deleteModule(codeM).subscribe(
        (data) => {
        
  
          if (data) {
            console.warn(data);
            let text = data;
            if (text.includes("fail")) {
              this.toastr
                .warning(data, "", {
                  timeOut: 5000,
                })
                .onHidden.subscribe(() => {});
            } else {
              this.toastr
                .success("classe avec code classe =" + codeM + " effacé", "", {
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
  