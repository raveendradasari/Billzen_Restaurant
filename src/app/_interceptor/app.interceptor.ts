import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Token } from '@angular/compiler';
import { AuthService } from '../shared/services/auth.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private injector:Injector) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authService  = this.injector.get(AuthService)
    let tokenizedReq= request.clone({
      headers:request.headers.append('interceptor-header','intercepted'),
      setHeaders:{
        'Content-type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Accept':'application/json,form-data/x-www-form-urlencoded; charset=utf-8',
        // Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzZWYxYzk3ZGE1NTg4Y2RhNWM3OGZiZCIsIm5hbWUiOiJzb3VteWEiLCJlbWFpbCI6InNvdW15YUBnbWFpbC5jb20iLCJtb2JpbGUiOjcwOTU2MTQ4NjQsImNyZWF0ZWRBdCI6IjIwMjMtMDItMTdUMDY6MjA6MDcuODEwWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDItMTdUMDY6MjA6MDcuODEwWiIsImFkbWluX2lkIjoxLCJfX3YiOjAsInBhc3N3b3JkIjoiZ3MxMjM0In0sImlhdCI6MTY3Njk3MDIyMX0.m0PsofmO0WiecGGo74ImXB-Rte6KWHOYCdfrSXmR6VA'}`
       Authorization: `${authService.authToken(Token)}`
      }
    })
    console.log('interceptor',authService.authToken(Token));
    return next.handle(tokenizedReq).pipe(
      catchError((error:HttpErrorResponse)=>{
      console.log(error)
      return throwError(error);
    }));
  }
}
