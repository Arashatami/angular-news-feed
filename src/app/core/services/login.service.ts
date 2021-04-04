import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { tap } from 'rxjs/internal/operators/tap';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _cookieService: CookieService
  ) { }

  loginUser(email: string, password: string) {
    const body = {
      email,
      password
    };

    return this._http
      .post(`${environment.mockServer}/login`, body)
      .pipe(
        tap((res: any) => {
          const helper = new JwtHelperService();
          document.cookie = "JWT" + "=" + res.accessToken + ";" + "expires=" + new Date(new Date().getTime() + helper.decodeToken(res.accessToken).exp * 1000).toUTCString() + ";path=/";
        })
      );
  }

  logout() {
    this._cookieService.removeAll({ path: '/' });
    this._router.navigate(['login']);
  }

}
