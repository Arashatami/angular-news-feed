import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';




@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private _cookieService: CookieService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const identity = this._cookieService.get("JWT");
    if (identity) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${identity}`,
          'Content-Type': 'application/json',
          'Accept': `application/json`
        }
      });
    }
    return next.handle(request);
  }

}
