

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endWith } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  serverEndpoint = `${environment.BaseUrl}`;
  constructor(private http: HttpClient) { }


  getseccategory() {
    const endPoint = `Section?sectionId=0`;
    return this.http.get(this.serverEndpoint + endPoint);
  }
  postsecCategory(Data: any) {
    const endPoint = `Section`;
    return this.http.post(this.serverEndpoint + endPoint, Data)
  }
  statusUpdateSection(data: any) {
    const endPoint = `Section`;
    return this.http.put(this.serverEndpoint + endPoint, data);
  }
  getTrascation() {
    const endPoint = `Transaction?transactionId=0`;
    return this.http.get(this.serverEndpoint + endPoint);
  }



}
