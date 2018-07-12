
import { throwError as observableThrowError,  Observable, pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private _authService: AuthService;
  constructor(private _injector: Injector) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._authService = this._injector.get(AuthService);
    const authData = this._authService.getAuthData() ? this._authService.getAuthData() : { token: null, user: null };
    request = request.clone({
      setHeaders: {
        'x-access-token': `${authData.token}`,
        'x-key': `${authData.user}`,
        'Content-Type': 'application/json'
      }
    });
    return next.handle(request);
  }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private _router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((response: any) => {
          if (response instanceof HttpErrorResponse && response.status === 401) {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('auth');
            this._router.navigateByUrl('/login');
          }
          return observableThrowError(response);
        })
      );
  }
}
