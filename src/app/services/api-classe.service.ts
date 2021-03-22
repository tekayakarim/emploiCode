import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiClasseService { 

  urlAPI = "http://localhost/api_polytech/Classe/";
  constructor(private http: HttpClient) { }

  addClasse(app){ 
    return this.http.post(this.urlAPI+"ajout.php", app);
  } 

  allClasses(){ 
    return this.http.get(this.urlAPI+"all.php");
  } 

}
