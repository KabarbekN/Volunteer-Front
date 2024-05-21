import { Component } from '@angular/core';
import {TokenService} from "./services/token/token.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'volunteer-frontend';
  username: string;
  constructor(
    private tokenService: TokenService,
  ) {
    this.username = ''
  }

  checkToken() {
    return this.tokenService.accessToken === undefined || this.tokenService.accessToken === null;
  }
  loadUser() {
    this.tokenService.accessToken
  }
}
