import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/services/login.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpPageComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }
  
  submitForm(signUpData: NgForm) {
    let userData: User = {
      email: signUpData.value.email,
      password: signUpData.value.password
    };
    userData.firstName = signUpData.value.fName;
    userData.lastName = signUpData.value.lName;
    this.loginService.saveRegistrationData(userData);
    this.router.navigate(['/home']);
  }
}
