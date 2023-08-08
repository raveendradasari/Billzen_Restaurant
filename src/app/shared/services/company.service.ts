





import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endWith } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  serverEndpoint = `${environment.BaseUrl}`;
  constructor(private http: HttpClient) { }


  getcompcategory() {
    const endPoint = `Company?companyid=0`;
    return this.http.get(this.serverEndpoint + endPoint);
  }
  postcompCategory(Data: any) {
    const endPoint = `Company`;
    return this.http.post(this.serverEndpoint + endPoint, Data)
  }
  statusUpdateCompany(data: any) {
    const endPoint = `Company`;
    return this.http.put(this.serverEndpoint + endPoint, data);
  }
  getTrascation() {
    const endPoint = `Transaction?transactionId=0`;
    return this.http.get(this.serverEndpoint + endPoint);
  }



}
