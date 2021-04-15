import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IUsuarioToken } from '../models/IUserToken';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  usuario:IUsuarioToken;
  constructor(
    private router: Router
  ) {
   
   }

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.usuario=JSON.parse(localStorage.getItem('dataUser'));
    let reqClone=req;
    if(this.usuario!=null){
      reqClone = req.clone({
          setHeaders: {
          Authorization: `Bearer ${ this.usuario.token }`
        }
      });
    }
    return next.handle(reqClone).pipe(
      retry(2),
      catchError(this.manejarError)
    )
  }
  manejarError(error:HttpErrorResponse){
    if (error.status === 401) {
          this.router.navigateByUrl('/login');
    }
    return throwError( error );
  }
}
