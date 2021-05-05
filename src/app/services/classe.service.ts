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
  public deleteClasse(id: number): Observable<any> {
    return this.httpClient.delete(this.url + "/delete?codeC=" + id, {
      responseType: "text",
    });
  }

  public updateClasse(classe:Classe): Observable<any> {
    return this.httpClient.put(this.url + "/update", classe, {
      responseType: "text",
    });
  }

  public getClasse(codeC :string): Observable<Classe> {
    return this.httpClient.get<Classe>(this.url + "/get?codeC="+codeC);
  }
}
