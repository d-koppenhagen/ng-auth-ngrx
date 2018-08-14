import { User } from './user';

export class AuthData {
  token?: string;
  tokenExpires?: number;
  user?: string;
}

export interface AuthState {
  // is a user authenticated?
  auth: AuthData;
  // if authenticated, there should be a user object
  user: User | null;
  // error message
  errorMessage: string | null;
}
