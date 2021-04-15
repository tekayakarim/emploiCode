import { Component, OnInit  , Input} from '@angular/core';
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
  @Input("codeC") codeC: string;
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
 
  onDeleteClick(codeC): void{
    this.classeService.deleteClasse(codeC).subscribe(
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
              .success("classe avec code classe =" + codeC + " effacé", "", {
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
