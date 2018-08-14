import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '../../models/user';
import { AuthState } from '../../models/auth';
import { getAuthState, AppState } from '../../store/app.states';
import { SignUp } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  authState$: Observable<AuthState>;
  user: User = new User();

  constructor(
    private _store: Store<AppState>
  ) { }

  ngOnInit() {
    this.authState$ = this._store
      .pipe(select(getAuthState));
  }

  onSubmit() {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this._store.dispatch(new SignUp(payload));
  }

}
