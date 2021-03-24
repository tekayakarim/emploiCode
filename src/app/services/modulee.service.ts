import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Modulee } from "../models/modulee";
@Injectable({
  providedIn: 'root'
})
export class ModuleeService {
  private url = "http://localhost:9000" + "/main/module";
  constructor(public httpClient: HttpClient) { }

  public createModule(modulee:Modulee): Observable<any> {
    return this.httpClient.post(this.url + "/add?id=1", modulee, {
      responseType: "text",
    });
  }

  public getAllModule(): Observable<Modulee[]> {
    return this.httpClient.get<Modulee[]>(this.url + "/getAll");
  }

}
