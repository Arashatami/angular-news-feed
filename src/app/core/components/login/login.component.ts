import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  loading: boolean = false;
  error: string = "";


  constructor(
    private _loginService: LoginService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {
    this.loginForm = this._formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,10}$')
        ]
      ],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }
  submit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this._loginService.loginUser(this.loginForm.value.email, this.loginForm.value.password).pipe(finalize(() => {
        this.loading = false;
      })).subscribe(
        Res => {
          this._router.navigate(["home"]);
        },
        Err => {
          this.error = Err.error;
        }
      );
    }
  }

}
