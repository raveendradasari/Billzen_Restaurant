import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private toast:NgToastService,private authService:AuthService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree|any {
      var data = this.authService.isLoggedIn();
      let isLoggin=localStorage.getItem('auth') && localStorage.getItem('otp') == null
      console.log('authGuard data',data);
      if(data == false){
        // this.toast.error({ detail: "Opps..!", summary: 'Login Required!'});
        this.router.navigate(['/login']);
        return false
      }else if(data==true){
        return true;
      }
  }
  
}
