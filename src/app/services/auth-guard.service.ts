import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import { AppState, selectAuthState } from '../store/app.states';
import { AuthActionTypes } from '../store/actions/auth.actions';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router,
    private store: Store<AppState>
  ) { }

  canActivate(): boolean {
    const userData = this.auth.getUserData();

    if (!userData) {
      this.router.navigateByUrl('/login');
      return false;
    }

    return true;
  }
}
