import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router
  ) { }

  canActivate(): boolean {
    const authData = this.auth.getAuthData();

    // check if token is already expired
    const validToken = new Date().getTime() < authData.tokenExpires;

    if (!authData || !validToken) {
      this.router.navigateByUrl('/login');
      return false;
    }

    return true;
  }
}
