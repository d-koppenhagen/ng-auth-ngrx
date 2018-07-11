import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectAuthState, AppState } from '../../store/app.states';
import { LogOut } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  auth = null;
  user = null;
  errorMessage = null;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.select(selectAuthState).subscribe(state => {
      console.log(state);
      this.auth = state.auth;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    });
  }

  logOut(): void {
    this.store.dispatch(new LogOut);
  }

}
