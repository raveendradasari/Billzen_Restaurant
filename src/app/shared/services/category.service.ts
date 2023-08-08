import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endWith } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  serverEndpoint = `${environment.BaseUrl}`;
  constructor(private http: HttpClient) { }

  getCategory() {
    const endPoint = `Category`;
    return this.http.get(this.serverEndpoint + endPoint);
  }
  postCategory(catData: any) {
    const endPoint = `Category`;
    return this.http.post(this.serverEndpoint + endPoint, catData)
  }
  updateStausCategory(data: any) {
    const endPoint = `Category`;
    return this.http.put(this.serverEndpoint + endPoint, data);
  }
  updateSatusSubCat(data: any) {
    const endPoint = `SubCatagory`;
    return this.http.put(this.serverEndpoint + endPoint, data);
  }
}
