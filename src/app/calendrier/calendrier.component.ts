import { Component, OnInit, NgModule, Inject, enableProdMode  } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Seance } from "../models/seance";
import { SeanceService } from "../services/seance.service";
import { Title } from '@angular/platform-browser';
import { rendererTypeName } from '@angular/compiler';
@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent implements OnInit {

 elements: Seance[];
 events:any[];
 sem="semstre 1";


  constructor(public seanceService: SeanceService) {
  
  }
  
  calendarOptions: CalendarOptions = {
    headerToolbar: { center: 'dayGridMonth,dayGridWeek,dayGridDay,timeGridWeek' }, // buttons for switching between views
    initialView: 'dayGridMonth',
    weekends: false ,
    navLinks: true,
    navLinkDayClick: function(date, jsEvent) {
      console.log('day', date.toISOString());
    },

    dateClick: this.handleDateClick.bind(this), // bind is important!
    events:this.getAllSeance()
   
  };
 
  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }
  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }
  
  ngOnInit(): void {
  }

 public getAllSeance():any[] {
    
    this.seanceService
      .getAllSeance()
      .subscribe((data) => {
        if (data) {
          this.elements = data;
          return  this.setEvents();
        }

      });
      return null;
  }//end getAllSeance
setEvents(): any[]{

this.events= [{title:"", start: "",
end:"",
color:"",
daysOfWeek: [ '' ],
height:700,
aspectRatio:1.5
}];


for (let i = 0; i < this.elements.length; i++) {
  const element = this.elements[i];
console.warn(element.module.semestre);

  if(element.module.semestre.includes(this.sem)){

  let color="blue";
  if (element.type.includes("fix")) {
    color="green";
  }
  if (element.type.includes("rattrapage")) {
    color="red";
  }
  if(element.jour!=null)
  {
    this.events.push( {title:"seance: "+element.codeS+" module: "+element.module.nomM
    +" enseignant: "+element.enseignant.nomUser+" "+element.enseignant.prenomUser
    +" classe: "+element.cl.codeC+" "+element.cl.niveauC
    , start: element.date+"T"+element.heureDeb,
    end: element.date+"T"+element.heureFin,
    color: color, 
    daysOfWeek: [ element.jour ] ,

    
    } );  
  }

  this.events.push( {title:"seance: "+element.codeS+" module: "+element.module.nomM
  +" enseignant: "+element.enseignant.nomUser+" "+element.enseignant.prenomUser
  +" classe: "+element.cl.codeC+" "+element.cl.niveauC, start: element.date+"T"+element.heureDeb,
  end: element.date+"T"+element.heureFin,
  color: color, 

  
  } );
}
}//end for


  this.calendarOptions.events=this.events;
  return this.events;
}//end setEvents
semstre1(){
  this.sem="semstre 1";
 console.warn(this.sem);
 this.getAllSeance();
}
semstre2(){
  this.sem="semstre 2";
console.warn(this.sem);
this.getAllSeance();
}
}
