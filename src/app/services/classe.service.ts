import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Classe } from "../models/classe";
@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  private url = "http://localhost:9000" + "/main/classe";
  constructor(public httpClient: HttpClient) { }

  public createClasse(classe:Classe): Observable<any> {
    return this.httpClient.post(this.url + "/add?id=1", classe, {
      responseType: "text",
    });
  }

  public getAllClasse(): Observable<Classe[]> {
    return this.httpClient.get<Classe[]>(this.url + "/getAll");
  }

}
