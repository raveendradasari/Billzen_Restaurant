import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  serverEndpoint = `${environment.BaseUrl}`;
  constructor(private http: HttpClient) { }


  getCategory() {
    const endPoint = `Category`;
    return this.http.get(this.serverEndpoint + endPoint);
  }
  getSubcategory() {
    const endPoint = `SubCatagory`;
    return this.http.get(this.serverEndpoint + endPoint);
  }
  getUnits() {
    const endPoint = `Units/0`;
    return this.http.get(this.serverEndpoint + endPoint);
  }
  getSection() {
    const endPoint = `Section?sectionId=0`;
    return this.http.get(this.serverEndpoint + endPoint);
  }
  getItem() {
    const endPoint = `Item`;
    return this.http.get(this.serverEndpoint + endPoint);
  }
  updateSatusItem(data:any) {
    const endPoint = `Item`;
    return this.http.put(this.serverEndpoint + endPoint,data);
  }
  // Tax 
  getTax() {
    const endPoint = `Tax?taxId=0`;
    return this.http.get(this.serverEndpoint + endPoint);
  }
  postTax(data: any) {
    const endPoint = `Tax`;
    return this.http.post(this.serverEndpoint + endPoint, data)
  }
  // Staff
  getStaff() {
    const endPoint = `Staff?staffId=0`;
    return this.http.get(this.serverEndpoint + endPoint)
  }
  postStaff(data: any) {
    const endPoint = `Staff`;
    return this.http.post(this.serverEndpoint + endPoint, data)
  }
  // Table
  getTable() {
    const endPoint = `Table`;
    return this.http.get(this.serverEndpoint + endPoint);
  }
  postTable(data: any) {
    const endPoint = `Table`;
    return this.http.post(this.serverEndpoint + endPoint, data)
  }
  updateSatusTable(data: any) {
    const endPoint = `Table`;
    return this.http.put(this.serverEndpoint + endPoint, data);
  }
  // unit
  getUnit() {
    const endPoint = `Units/0`;
    return this.http.get(this.serverEndpoint + endPoint);
  }
  postUnit(data: any) {
    const endPoint = `Units`;
    return this.http.post(this.serverEndpoint + endPoint, data)
  }
  statusUpdateUnit(data: any) {
    const endPoint = `Units`;
    return this.http.put(this.serverEndpoint + endPoint, data)
  }
  // Shift
  getShift() {
    const endPoint = `Shift?shiftId=0`;
    return this.http.get(this.serverEndpoint + endPoint);
  }
  postShift(data: any) {
    const endPoint = `Shift`;
    return this.http.post(this.serverEndpoint + endPoint, data);
  }

  updateSatusShift(data: any) {
    const endPoint = `Shift`;
    return this.http.put(this.serverEndpoint + endPoint, data);
  }
  // trasaction
  getTrasaction() {
    const endPoint = `Transaction?transactionId=0`;
    return this.http.get(this.serverEndpoint + endPoint);
  }
  postItem(data: any) {
    const endPoint = `Item`;
    return this.http.post(this.serverEndpoint + endPoint, data);
  }

  getItemByID(id: number) {
    const endPoint = `Item?itemId=${{ id }}`;
    return this.http.get(this.serverEndpoint + endPoint);
  }
}
