import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getAuthState, AppState } from '../../store/app.states';
import { AuthState } from '../../models/auth';
import { LogOut } from '../../store/actions/auth.actions';
import { ExampleService } from '../../services/example.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  authState$: Observable<AuthState>;
  exampleData$: Observable<{[key: string]: any}>;

  constructor(
    private _store: Store<AppState>,
    private _es: ExampleService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.authState$ = this._store
      .pipe(select(getAuthState));
  }

  logOut() {
    this._store.dispatch(new LogOut);
    this._router.navigateByUrl('/login');
  }

  getExampleData() {
    this.exampleData$ = this._es.getExampleData();
  }

}
