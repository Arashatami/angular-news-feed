import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  error: string = "";


  constructor(
    private _loginService: LoginService
  ) { }

  ngOnInit(): void {
  }
  submit() {
    if (this.login.valid) {
      this._loginService.loginUser(this.login.value.username, this.login.value.password).subscribe(
        Res => {

        }
        ,
        Err => {

        }
      );
    }
  }

}
