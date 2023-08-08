import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverEndpoint = `${environment.BaseUrl}`;
  constructor(private http:HttpClient) {
    if (environment.production) {
      this.serverEndpoint = environment.BaseUrl;
    }
  }

  authUser(data:any){
    const endPoint = 'login'
    return this.http.post(this.serverEndpoint + endPoint,data);
  }
  // authOtp(data:any){
  //   const endPoint = 'login';
  //   return this.http.post(this.serverEndpoint + endPoint,data);
  // }
  authToken(token:any){
    const auth:any = localStorage.getItem('token');
    var token= JSON.parse(auth);
    return token;
  }
 
  isLoggedIn() {
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == undefined ){
      return false
    }else
    {
      return true
    }
  }
}
