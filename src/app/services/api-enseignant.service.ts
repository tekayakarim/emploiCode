import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiEnseignantService { 

  urlAPI = "http://localhost/api_polytech/Enseignant/";
  constructor(private http: HttpClient) { }

  addEnseignant(app){ 
    return this.http.post(this.urlAPI+"ajout.php", app);
  } 

  allEnseignant(){ 
    return this.http.get(this.urlAPI+"all.php");
  } 

}
