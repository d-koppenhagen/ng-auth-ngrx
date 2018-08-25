import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../environments/environment';

// modules
import { AppRoutingModule } from './app-routing.module';
import { AppStoreModule } from './app-store.module';

// components
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

// providers
import { TokenInterceptor, ErrorInterceptor } from './services/token.interceptor';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

export const SHARED_DECLARATIONS: any[] = [
  AppComponent,
  LandingComponent,
  LoginComponent,
  SignupComponent
];

export const SHARED_IMPORTS: any[] = [
  AppRoutingModule,
  AppStoreModule
];

export const SHARED_PROVIDERS: any[] = [
  AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  },
  {
    provide: 'API_URL',
    useValue: environment.apiUrl
  }
];
