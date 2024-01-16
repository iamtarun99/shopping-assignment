import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = {
    email: '',
    password: ''
  };
  isLoginError: boolean = false;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.isLoggedIn$.subscribe((response: boolean) => {
      if (response) {
        this.router.navigate(['/home']);
      }
    });
  }
  submitLogin(loginData: NgForm) {
    this.user.email = loginData.value.email;
    this.user.password = loginData.value.password;

    if (this.loginService.checkLoginCred(this.user)) {
      this.router.navigate(['/home']);
    }
    else {
      this.isLoginError = true;
      // this.loginService.logOut();
    }
  }
}
