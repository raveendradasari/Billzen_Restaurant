import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  serverEndpoint = `${environment.BaseUrl}`
  constructor(private http: HttpClient) { }
 getCustomer(){
  const endPoint=`Customer?customerId=0`;
  return this.http.get(this.serverEndpoint+endPoint);
 }
 postCustomer(data:any){
  const endPoint=`Customer`;
  return this.http.post(this.serverEndpoint+endPoint,data);
 }
 updateStatusCustomer(data:any){
  const endPoint=`Customer`;
  return this.http.put(this.serverEndpoint+endPoint,data);
 }
}
