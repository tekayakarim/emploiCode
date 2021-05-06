import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Seance } from "../models/seance";
@Injectable({
  providedIn: 'root'
})
export class SeanceService {
  private url = "http://localhost:9000" + "/main/seance";
  constructor(public httpClient: HttpClient) { }

  public createSeance(seance:Seance): Observable<any> {
    return this.httpClient.post(this.url + "/add?id=1", seance, {
      responseType: "text",
    });
  }

  public getAllSeance(): Observable<Seance[]> {
    return this.httpClient.get<Seance[]>(this.url + "/getAll");
  }

  public deleteSeance(id: number): Observable<any> {
    return this.httpClient.delete(this.url + "/delete?codeS=" + id, {
      responseType: "text",
    });
  }

  public updateSeance(seance:Seance): Observable<any> {
    return this.httpClient.put(this.url + "/update", seance, {
      responseType: "text",
    });
  }

  public getSeance(codeS:string): Observable<Seance> {
    return this.httpClient.get<Seance>(this.url + "/get?codeS="+codeS);
  }
}
