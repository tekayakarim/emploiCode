import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiSeancesService { 

  urlAPI = "http://localhost/api_polytech/Seances/";
  constructor(private http: HttpClient) { }

  addSeances(app){ 
    return this.http.post(this.urlAPI+"ajout.php", app);
  } 

  allSeances(){ 
    return this.http.get(this.urlAPI+"all.php");
  } 

}