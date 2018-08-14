import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '../../models/user';
import { AppState, getAuthErrors } from '../../store/app.states';
import { LogIn } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  errorMessage$: Observable<string>;

  constructor(
    private _store: Store<AppState>
  ) { }

  ngOnInit() {
    this.errorMessage$ = this._store
      .pipe(select(getAuthErrors));
  }

  onSubmit() {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this._store.dispatch(new LogIn(payload));
  }

}
