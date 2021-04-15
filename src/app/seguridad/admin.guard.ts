import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginServices } from '../services/loginService';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router:Router,private serviceLogin:LoginServices){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     const datosUser=localStorage.getItem('dataUser')
     if(datosUser){
       return true;
     }
     else{
       this.router.navigate(['/login']);
     }
    /* this.router.navigate(['/login']);
    return false; */
    //return true;
  }
  
}
