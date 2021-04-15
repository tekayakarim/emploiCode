import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";
@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private url = "http://localhost:9000" + "/main/etudiant";
  constructor(public httpClient: HttpClient) { }

  public createEtudiant(user:User): Observable<any> {
    return this.httpClient.post(this.url + "/add?id=1", user, {
      responseType: "text",
    });
  }

  public getAllEtudiant(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url + "/getAll");
  }
  public deletetudiant(id: number): Observable<any> {
    return this.httpClient.delete(this.url + "/delete?id=" + id, {
      responseType: "text",
    });
  }
}
