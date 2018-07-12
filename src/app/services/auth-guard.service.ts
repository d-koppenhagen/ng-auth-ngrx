import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private _auth: AuthService,
    private _router: Router
  ) { }

  canActivate(): boolean {
    const authData = this._auth.getAuthData();
    if (authData && new Date().getTime() < authData.tokenExpires) {
      return true;
    }

    this._router.navigateByUrl('/login');
    return false;
  }
}
