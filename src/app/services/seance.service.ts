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


}
