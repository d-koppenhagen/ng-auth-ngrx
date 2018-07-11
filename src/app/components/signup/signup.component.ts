import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from '../../models/user';
import { AppState, selectAuthState } from '../../store/app.states';
import { SignUp } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {

  user: User = new User();
  errorMessage: string | null;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.select(selectAuthState).subscribe(state => {
      this.errorMessage = state.errorMessage;
    });
  }

  onSubmit() {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch(new SignUp(payload));
  }

}
