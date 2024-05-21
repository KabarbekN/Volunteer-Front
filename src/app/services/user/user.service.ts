import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  set username (username: string) {
    localStorage.setItem('username', username);
  }

  get username() {
    return localStorage.getItem('username') as string;
  }

  set role (role: string) {
    localStorage.setItem('role', role);
  }

  get role() {
    return localStorage.getItem('role') as string;
  }
}
