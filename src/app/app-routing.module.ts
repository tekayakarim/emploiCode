import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';


import { RegisterComponent } from './register/register.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { CalendrierComponent} from './calendrier/calendrier.component';
import { ModulesComponent } from './modules/modules.component';
import { SeancesComponent} from './seances/seances.component';
import { ClassesComponent} from './classes/classes.component';
import { EnseignantsComponent } from './enseignant/enseignants/enseignants.component';
import { EtudiantsComponent } from './etudiant/etudiants/etudiants.component';

import { AuthGuardService as AuthGuard } from "./services/auth-guard.service";
import { AddClasseComponent } from './classes/add-classe/add-classe.component';
import { AddModuleComponent } from './modules/add-module/add-module.component';
import { AddSeanceComponent } from './seances/add-seance/add-seance.component';
const routes: Routes = [
  {path:'', redirectTo: 'login', pathMatch: 'full' },
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'home', component: HomeComponent,
   canActivate:[AuthGuard],
    children: [
      { path: '', component: DashboardComponent}, 
      {path: 'calendrier' , component: CalendrierComponent},
      {path: 'classes' , component: ClassesComponent},
      {path: 'modules' , component: ModulesComponent},
      {path: 'seances' , component: SeancesComponent},
      {path: 'enseignant' , component: EnseignantsComponent},
      {path: 'etudiants' , component: EtudiantsComponent},

      {path: 'addClasse' , component: AddClasseComponent},
      {path: 'addModule' , component: AddModuleComponent},
      {path: 'addSeance' , component: AddSeanceComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
