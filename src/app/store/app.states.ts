import { createFeatureSelector } from '@ngrx/store';

import * as auth from './reducers/auth.reducers';


export interface AppState {
  authState: auth.AuthState;
}

export const reducers = {
  auth: auth.reducer
};

export const selectAuthState = createFeatureSelector<auth.AuthState>('auth');
