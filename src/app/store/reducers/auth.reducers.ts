import { User } from '../../models/user';
import { AuthData } from '../../models/auth';
import { AuthActionTypes, All } from '../actions/auth.actions';

export interface AuthState {
  // is a user authenticated?
  auth: AuthData;
  // if authenticated, there should be a user object
  user: User | null;
  // error message
  errorMessage: string | null;
}

const localStorageUserData = localStorage.getItem('currentUser');
const localStorageAuthData = localStorage.getItem('currentUser');
const currentAuthState: AuthData = localStorageAuthData && localStorageAuthData !== 'undefined' ? JSON.parse(localStorageAuthData) : null;
const currentUser: User = localStorageUserData && localStorageUserData !== 'undefined' ? JSON.parse(localStorageUserData) : null;

export const initialState: AuthState = currentAuthState
  && currentUser ?
  {
    auth: currentAuthState,
    user: currentUser,
    errorMessage: null
  } : {
    auth: null,
    user: null,
    errorMessage: null
  };

export function reducer(state = initialState, action: All): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        auth: {
          token: action.payload.token,
          tokenExpires: action.payload.expires,
          user: action.payload.user.email
        },
        user: action.payload.user,
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: 'Incorrect email and/or password.'
      };
    }
    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        auth: {
          token: action.payload.token,
          tokenExpires: action.payload.expires,
          user: action.payload.user.email
        },
        user: action.payload.user,
        errorMessage: null
      };
    }
    case AuthActionTypes.SIGNUP_FAILURE: {
      return {
        ...state,
        errorMessage: 'That email is already in use.'
      };
    }
    case AuthActionTypes.LOGOUT: {
      return {
        auth: null,
        user: null,
        errorMessage: null
      };
    }
    default: {
      return state;
    }
  }
}
