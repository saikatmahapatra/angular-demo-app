import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isTokenExpired() {
    return false;
  }

  isLoggedIn() {
    return true;
  }
}
