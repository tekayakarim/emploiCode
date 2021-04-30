import { Component, OnInit, NgModule, Inject, enableProdMode  } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Seance } from "../models/seance";
import { SeanceService } from "../services/seance.service";
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent implements OnInit {

 elements: Seance[];
 events:any[];
 

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
  }
setEvents(): any[]{

this.events= [{title:"", start: "",
end:"",
color:"",
daysOfWeek: [ '' ]}];

for (let i = 0; i < this.elements.length; i++) {
  const element = this.elements[i];

  let color="blue";
  if (element.type.includes("fix")) {
    color="green";
  }
  if (element.type.includes("rattrapage")) {
    color="red";
  }
  if(element.jour!=null)
  {
    this.events.push( {title:element.codeS, start: element.date+"T"+element.heureDeb,
    end: element.date+"T"+element.heureFin,
    color: color, 
    daysOfWeek: [ element.jour ] ,
    
    } );  
  }

  this.events.push( {title:element.codeS, start: element.date+"T"+element.heureDeb,
  end: element.date+"T"+element.heureFin,
  color: color, 
  } );
}

    this.events.push( { title:"se.codeS", start: '2021-04-27T14:30:00',
    end: '2021-04-27T14:30:00',
    dateEnd:"2021-05-21",
    color: 'red',
    daysOfWeek: [ '1' ]
   });

  console.log(this.events);
  this.calendarOptions.events=this.events;
  return this.events;
}

}
