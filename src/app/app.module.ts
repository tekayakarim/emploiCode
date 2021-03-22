import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction';
import { ModulesComponent } from './modules/modules.component';
import { SeancesComponent } from './seances/seances.component';
import { ClassesComponent } from './classes/classes.component';
import { EnseignantsComponent } from './enseignant/enseignants/enseignants.component';
import { EtudiantsComponent } from './etudiant/etudiants/etudiants.component'; // a plugin
import googleCalendarPlugin from '@fullcalendar/google-calendar';
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
 interactionPlugin,
 // googleCalendarPlugin
 //googleCalendarApiKey : 'AIzaSyCZ4HOyGIwl0QJLbf5jNXYOpKzOzQx4Fw8',
 //events: {
  // googleCalendarId: 'hhnik4uamkdap0gaa4qilu7deg@group.calendar.google.com'
 //}
]);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    CalendrierComponent,
    ModulesComponent,
    SeancesComponent,
    ClassesComponent,
    EnseignantsComponent,
    EtudiantsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule ,// register FullCalendar with you app
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
