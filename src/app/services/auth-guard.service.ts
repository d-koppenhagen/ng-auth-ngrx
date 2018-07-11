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
    if (authData && new Date().getTime() < authData.tokenExpires) {
      return true;
    }

    this.router.navigateByUrl('/login');
    return false;
  }
}
