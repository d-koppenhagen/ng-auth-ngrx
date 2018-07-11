import { User } from '../../models/user';
import { AuthActionTypes, All } from '../actions/auth.actions';


export interface AuthState {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
  // error message
  errorMessage: string | null;
}

const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));

export const initialState: AuthState = currentUser ?
  {
    isAuthenticated: true,
    user: currentUser,
    errorMessage: null
  } : {
    isAuthenticated: false,
    user: null,
    errorMessage: null
  };

export function reducer(state = initialState, action: All): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.email
        },
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
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.email
        },
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
      return initialState;
    }
    default: {
      return state;
    }
  }
}
