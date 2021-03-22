import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiEtudiantService { 

  urlAPI = "http://localhost/api_polytech/Etudiant/";
  constructor(private http: HttpClient) { }

  addEtudiant(app){ 
    return this.http.post(this.urlAPI+"ajout.php", app);
  } 

  allEtudiant(){ 
    return this.http.get(this.urlAPI+"all.php");
  } 

}
