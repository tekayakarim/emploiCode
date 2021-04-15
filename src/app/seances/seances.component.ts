import { Component, OnInit  , Input} from '@angular/core'; 
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
  @Input("id") id: number;
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
  onDeleteClick(id): void{
    this.seanceService.deleteSeance(id).subscribe(
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
              .success("seance avec id=" + id + " effacé", "", {
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
