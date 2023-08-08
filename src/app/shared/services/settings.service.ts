import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  serverEndpoint = `${environment.BaseUrl}`;

  constructor(private http: HttpClient) { }

  getUserPermission(id:number) {
    const endPoint = `AcessPermissions?role_id=${id}`
    return this.http.get(this.serverEndpoint + endPoint);
  }
  getAllUser() {
    const endPoint = `User/0`;
    return this.http.get(this.serverEndpoint + endPoint);
  }
  updateUserPermission(data: any) {
    const endPoint = `AcessPermissions`;
    return this.http.put(this.serverEndpoint + endPoint, data);
  }
  getAccess(){
    const endPoint=`AcesspermissionsByAcessId?acess_Id=0`;
    return this.http.get(this.serverEndpoint+endPoint);
  }
}