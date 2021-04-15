import { Component, OnInit , Input} from '@angular/core'; 
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
  @Input("id") id: number;
  appels:any = [];
  idU : number ; 
  modalContent:undefined ;

  elements: User[];
  constructor(private service:ApiEnseignantService, private toastr: ToastrService, private modalService: NgbModal
    , public enseignantService: EnseignantService){
    console.log("user ID : "+localStorage.getItem("userID"));
    this.idU = parseInt(localStorage.getItem("userID"));
  }

  onDeleteClick(id): void{
    this.enseignantService.deleteEnseignant(id).subscribe(
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
  