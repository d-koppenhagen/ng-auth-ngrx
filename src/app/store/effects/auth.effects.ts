import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, pipe, of as observableOf } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import {
  AuthActionTypes,
  LogIn,
  LogInSuccess,
  LogInFailure,
  SignUp,
  SignUpSuccess,
  SignUpFailure,
  LogOut,
} from '../actions/auth.actions';
import { AuthData } from '../../models/auth';

@Injectable()
export class AuthEffects {

  constructor(
    private _actions: Actions,
    private _authService: AuthService,
    private _router: Router,
  ) {}

  @Effect()
  LogIn: Observable<any> = this._actions
    .ofType(AuthActionTypes.LOGIN)
    .pipe(
      map((action: LogIn) => action.payload),
      switchMap(payload => {
        return this._authService.logIn(payload.email, payload.password)
          .pipe(
            map(res => {
              return new LogInSuccess(res);
            }),
            catchError(error => {
              console.log(error);
              return observableOf(new LogInFailure({ error: error }));
            })
          );
      })
    );


  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this._actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap(res => {
      const authData: AuthData = {
        tokenExpires: res.payload.expires,
        token: res.payload.token,
        user: res.payload.user.email
      };
      localStorage.setItem('auth', JSON.stringify(authData));
      localStorage.setItem('currentUser', JSON.stringify(res.payload.user));
      this._router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this._actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect()
  SignUp: Observable<any> = this._actions
    .ofType(AuthActionTypes.SIGNUP)
    .pipe(
      map((action: SignUp) => action.payload),
      switchMap(payload => {
        return this._authService.signUp(payload.email, payload.password)
          .pipe(
            map((user) => {
              return new SignUpSuccess({
                token: user.token,
                email: payload.email,
                tokenExpires: payload.tokenExpires
              });
            }),
            catchError((error) => {
              return observableOf(new SignUpFailure({ error: error }));
            })
          );
      })
    );

  @Effect({ dispatch: false })
  SignUpSuccess: Observable<any> = this._actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    tap((res) => {
      console.log(res);
      localStorage.setItem('auth', JSON.stringify(res.payload.auth));
      localStorage.setItem('currentUser', JSON.stringify(res.payload.user));
      this._router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  SignUpFailure: Observable<any> = this._actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE)
  );

  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this._actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('auth');
    })
  );
}
