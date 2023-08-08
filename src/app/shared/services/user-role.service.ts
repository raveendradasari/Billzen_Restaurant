import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  serverEndpoint = `${environment.BaseUrl}`;
  constructor(private http: HttpClient) { }
  getUserRole() {
    const endPoint = `User/0`;
    return this.http.get(this.serverEndpoint + endPoint);
  }
 
  postUserrole(Data: any) {
    const endPoint = `User`;
    return this.http.post(this.serverEndpoint + endPoint, Data)
  }
  updateSatusUserrole(data:any){
    const endPoint = `User`;
    return this.http.put(this.serverEndpoint + endPoint, data)
  }
  // Greeting
  getGreeting(){
    const endPoint=`Greeting?greeting_id=0`;
    return this.http.get(this.serverEndpoint+endPoint)
  }
  postGreeting(Data: any) {
    const endPoint = `Greeting`;
    return this.http.post(this.serverEndpoint + endPoint, Data)
  }
  updateGreeting(data:any){
    const endPoint = `Greeting`;
    return this.http.put(this.serverEndpoint + endPoint, data)
  }
  // transaction Transaction?transactionId=0
  getTrasaction(){
    const endPoint=`Transaction?transactionId=0`;
    return this.http.get(this.serverEndpoint+endPoint)
  }
}
