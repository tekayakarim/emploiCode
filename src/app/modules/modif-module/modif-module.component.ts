import { Component, OnInit } from '@angular/core';
 
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModuleeService } from "../../services/modulee.service";
import { Router ,ActivatedRoute} from '@angular/router';
import { Modulee } from "../../models/modulee"
@Component({
  selector: 'app-modif-module',
  templateUrl: './modif-module.component.html',
  styleUrls: ['./modif-module.component.css']
})
export class ModifModuleComponent implements OnInit {
  modifMo: FormGroup;
  codeM:string;
  module:Modulee=new Modulee();
  constructor(
    public moduleeService: ModuleeService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private actRouter: ActivatedRoute
  ) { 
    let formControls = {
      nomM: new FormControl('', Validators.required),
      niveau: new FormControl('', Validators.required),
      semestre: new FormControl('', Validators.required),
    };
    this.modifMo = this.fb.group(formControls);
    this.codeM = this.actRouter.snapshot.params.moduleid;
  }

  ngOnInit(): void {
    this.getModule();
  }
  onModifClick(): void{
    this.modifMo.value.codeM=this.codeM;
    
    this.moduleeService.updateModule(this.modifMo.value).subscribe(
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
              .success("" + text , "", {
                timeOut: 1000,
              })
              .onHidden.subscribe(() => {
                this.router.navigate(['/home/modules']);
              
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
  getModule(){
    console.warn();
    
    this.moduleeService.getModule(this.codeM).subscribe(
      (data) => {
      

        if (data) {
          console.warn(data);
        this.module=data;

        }
      },
      (ex) => {
        console.log(ex);
        this.toastr.warning("Erreur", "", { timeOut: 3000 });
      }
    );
  }
}
