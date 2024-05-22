import { Component } from '@angular/core';
import {TokenService} from "./services/token/token.service";
import {UserService} from "./services/user/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'volunteer-frontend';
  username: string;
  role: string;
  constructor(
    private tokenService: TokenService,
    private userService: UserService
  ) {
    this.username = userService.username;
    this.role = userService.role;
  }

  checkToken() {
    return this.tokenService.accessToken === undefined || this.tokenService.accessToken === null;
  }
  loadUser() {
    this.tokenService.accessToken
  }
}
