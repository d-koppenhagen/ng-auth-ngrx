import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from '../../models/user';
import { AppState, selectAuthState } from '../../store/app.states';
import { LogIn } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  errorMessage: string | null;

  constructor(
    private _store: Store<AppState>
  ) { }

  ngOnInit() {
    this._store.select(selectAuthState).subscribe(state => {
      this.errorMessage = state.errorMessage;
    });
  }

  onSubmit() {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this._store.dispatch(new LogIn(payload));
  }

}
