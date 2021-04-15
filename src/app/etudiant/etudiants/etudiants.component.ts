import { Component, OnInit , Input} from '@angular/core'; 
import { ToastrService } from 'ngx-toastr';
import { ApiEtudiantService } from '../../services/api-etudiant.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { User } from "../../models/user";
import { EtudiantService } from "../../services/etudiant.service";
@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.css']
})
export class EtudiantsComponent implements OnInit {
  @Input("id") id: string;
  elements: User[];

  reponses:any = [];
  modalContent:undefined ;
  idU:number; 
  isReclamant:boolean = false  ; 
  constructor(private service:ApiEtudiantService, private toastr: ToastrService, 
    private modalService: NgbModal, private router:Router
    , public etudiantService: EtudiantService){
   this.idU = parseInt(localStorage.getItem("userID"));
  }
  ngOnInit(): void {  
    //this.getMesClasses();
    this.getAllEtudiant();
  }
  onDeleteClick(id): void{
    this.etudiantService.deletetudiant(id).subscribe(
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
              .success("enseignant avec id=" + id + " effacé", "", {
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

  //getMesClasses(){ 
   // this.service.allClasses(this.idU).subscribe(data=>{ 
    //  if(data['RESPONSE']!="ERREUR"){this.recs = data;  } 
  //  },error=>{
    //  console.log("Error : "+error);
   // });
 // }


 getAllEtudiant() {
    
  this.etudiantService
    .getAllEtudiant()
    .subscribe((data) => {
      if (data) {
        console.warn(data);
        this.elements = data;
      }

    });
}

 
   
}
  