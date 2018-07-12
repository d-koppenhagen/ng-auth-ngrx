import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { selectAuthState, AppState } from '../../store/app.states';
import { LogOut } from '../../store/actions/auth.actions';
import { ExampleService } from '../../services/example.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  auth = null;
  user = null;
  errorMessage = null;
  exampleData = null;

  constructor(
    private _store: Store<AppState>,
    private _es: ExampleService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._store.select(selectAuthState).subscribe(state => {
      console.log(state);
      this.auth = state.auth;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    });
  }

  logOut() {
    this._store.dispatch(new LogOut);
    this._router.navigateByUrl('/login');
  }

  getExampleData() {
    this._es.getExampleData()
      .subscribe(res => this.exampleData = res);
  }

}
