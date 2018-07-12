import { Component, OnInit } from '@angular/core';
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
    private store: Store<AppState>,
    private es: ExampleService
  ) { }

  ngOnInit() {
    this.store.select(selectAuthState).subscribe(state => {
      console.log(state);
      this.auth = state.auth;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    });
  }

  logOut() {
    this.store.dispatch(new LogOut);
  }

  getExampleData() {
    this.es.getExampleData()
      .subscribe(res => this.exampleData = res);
  }

}
