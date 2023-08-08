import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RepotsService {
  serverEndpoint=`${environment.BaseUrl}`
  constructor(private http:HttpClient) { }
  getCatReport(url:string){
    // const endPoint=`SalesByCategory?fromDate=01%2F01%2F2022&toDate=01%2F01%2F2025&category_id=0`;
    return this.http.get(this.serverEndpoint+url);
  }
  getSubcatReport(url:string){
    // const endPoint=`SalesByCategorySubCategory?fromDate=01%2F01%2F2022&toDate=01%2F01%2F2025&categoryId=0&subcategory_id=0`;
    return this.http.get(this.serverEndpoint+url);
  }
  getItemReort(url:string){
    // const endPoint=`SalesByItem?fromDate=01%2F01%2F2022&toDate=01%2F01%2F2025`;
    return this.http.get(this.serverEndpoint+url);
  }
  getCatSubReort(url:string){
    // const endPoint=`SalesReportByCategoryName?fromDate=01%2F01%2F2022&toDate=01%2F01%2F2025`;
    return this.http.get(this.serverEndpoint+url);
  }
  
}
