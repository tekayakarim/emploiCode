import { Component, OnInit, NgModule, Inject, enableProdMode  } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent implements OnInit {


  constructor() {}
  
  calendarOptions: CalendarOptions = {
    headerToolbar: { center: 'dayGridMonth,dayGridWeek,dayGridDay,timeGridWeek' }, // buttons for switching between views
    initialView: 'dayGridMonth',
    weekends: false ,
    navLinks: true,
    navLinkDayClick: function(date, jsEvent) {
      console.log('day', date.toISOString());
    },
    
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: 'event 1', date: '2019-04-01' },
      { title: 'event 2', date: '2019-04-02' }
    ]
    
  };
 
  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }
  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }
  
  ngOnInit(): void {
  }

}
