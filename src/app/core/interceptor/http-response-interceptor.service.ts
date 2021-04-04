import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class HttpResponseInterceptor implements HttpInterceptor {

  constructor(
    private _router: Router,
    private _loginService: LoginService,
    private _snackBar: MatSnackBar
  ) {
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this._loginService.logout();
            this._router.navigate(['/login']);
          }
          else {
            this._snackBar.open(error.error);
          }
          throw error;
        })
      );
  }
}
