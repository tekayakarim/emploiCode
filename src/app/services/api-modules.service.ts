import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiModulesService { 

  urlAPI = "http://localhost/api_polytech/Modules/";
  constructor(private http: HttpClient) { }

  addModules(app){ 
    return this.http.post(this.urlAPI+"ajout.php", app);
  } 

  allModules(){ 
    return this.http.get(this.urlAPI+"all.php");
  } 

}