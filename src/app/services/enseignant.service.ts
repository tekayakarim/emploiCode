import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user"; 
@Injectable({
  providedIn: 'root'
})
export class EnseignantService {
  private url = "http://localhost:9000" + "/main/enseignant";
  constructor(public httpClient: HttpClient) { }

  public createEnseignant(user:User): Observable<any> {
    return this.httpClient.post(this.url + "/add?id=1", user, {
      responseType: "text",
    });
  }

  public getAllEnseignant(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url + "/getAll");
  }


  public deleteEnseignant(id: number): Observable<any> {
    return this.httpClient.delete(this.url + "/delete?id=" + id, {
      responseType: "text",
    });
  }

  public getEnseignant(id:number): Observable<User> {
    return this.httpClient.get<User>(this.url + "/get?id="+id);
  }

}
