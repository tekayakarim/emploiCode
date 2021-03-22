import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
   isAdmin = false ; 
   isReclamant = false ; 
  constructor() { }

  ngOnInit(): void {
     console.log("roleee : "+localStorage.getItem("roleUser"));
     if(localStorage.getItem("roleUser")=="ADMIN"){
        this.isAdmin = true ; 
        this.isReclamant = false ; 
     }else{
        this.isAdmin = false ; 
        this.isReclamant = true ;
     }
  }

}
