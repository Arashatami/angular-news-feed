import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  error: string = "";


  constructor(
    private _loginService: LoginService,
    private _formBuilder: FormBuilder,
  ) {
    this.loginForm = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }
  submit() {
    if (this.loginForm.valid) {
      this._loginService.loginUser(this.loginForm.value.username, this.loginForm.value.password).subscribe(
        Res => {

        }
        ,
        Err => {

        }
      );
    }
  }

}
