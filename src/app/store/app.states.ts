import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState } from '../models/auth';
import * as auth from './reducers/auth.reducers';

export interface AppState {
  authState: AuthState;
}

export const reducers = {
  auth: auth.reducer
};

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const getAuthErrors = createSelector(
  getAuthState,
  state => state.errorMessage
);
