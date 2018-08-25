import { Routes } from '@angular/router';

import { LandingComponent } from './components/landing/landing.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', component: LandingComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/' }
];

