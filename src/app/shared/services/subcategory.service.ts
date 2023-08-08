

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endWith } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  serverEndpoint = `${environment.BaseUrl}`;
  constructor(private http: HttpClient) { }


  getSubcategory() {
    const endPoint = `SubCatagory`;
    return this.http.get(this.serverEndpoint + endPoint);
  }
  postSubCategory(Data: any) {
    const endPoint = `SubCatagory`;
    return this.http.post(this.serverEndpoint + endPoint, Data)
  }

  getCategory() {
    const endPoint = `Category`;
    return this.http.get(this.serverEndpoint + endPoint);
  }
  postCategory(catData: any) {
    const endPoint = `Category`;
    return this.http.post(this.serverEndpoint + endPoint, catData)
  }

  // Discount 
  getDiscount() {
    const endPoint = `Discount?discountId=0`;
    return this.http.get(this.serverEndpoint + endPoint);
  }
  postDiscount(Data: any) {
    const endPoint = `Discount`;
    return this.http.post(this.serverEndpoint + endPoint, Data)
  }
  updateSatusShift(data:any){
    const endPoint = `Discount`;
    return this.http.put(this.serverEndpoint + endPoint, data)
  }
  // Role
  getRole() {
    const endPoint = `Roles/0`;
    return this.http.get(this.serverEndpoint + endPoint);
  }
  postRole(Data: any) {
    const endPoint = `Roles`;
    return this.http.post(this.serverEndpoint + endPoint, Data)
  }
  updateSatusRole(data:any){
    const endPoint = `Roles`;
    return this.http.put(this.serverEndpoint + endPoint, data)
  }
  // Userrole
  
}
