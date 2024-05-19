import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationRequest} from "../../services/models/authentication-request";
import {AuthenticationControllerService} from "../../services/services/authentication-controller.service";
import {TokenService} from "../../services/token/token.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authRequest: AuthenticationRequest = {username: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationControllerService,
    private tokenService: TokenService,
    private http: HttpClient,
  ) {

  }

  login() {
    this.postData()
    this.errorMsg = [];
    // this.authService.authenticate({
    //   body: this.authRequest
    // }).pipe().subscribe(
    //   {
    //
    //     next: (res) => {
    //       console.log(res);
    //       this.tokenService.token = res.access_token as string;
    //       this.router.navigate([''])
    //     },
    //     error: (err) => {
    //       if (err.error.validationErrors) {
    //         this.errorMsg = err.error.validationErrors;
    //       } else {
    //         // this.errorMsg.push('An error occurred during authentication.');
    //       }
    //
    //     }
    //   }
    // )
  }


  postData() {
    this.errorMsg = [];

    const url = 'http://localhost:8080/api/v1/auth/authenticate'; // Replace with your API endpoint

    const data = this.authRequest;// Data to be sent in the request body

    const headers = new HttpHeaders().set('Content-Type', 'application/json'); // Optional headers

    this.http.post<any>(url, data, { headers }).subscribe(
      response => {
        console.log(response.access_token as string);
        this.tokenService.accessToken = response.access_token as string;
        this.tokenService.refreshToken = response.refreshToken as string;
        },
      error => {
        if (error.error.validationErrors) {
          this.errorMsg = error.error.validationErrors;
        } else {
          this.errorMsg.push(
            error.error.error
          );
        }
      }
    );
  }


  register() {
    this.router.navigate(['register'])
  }
}
