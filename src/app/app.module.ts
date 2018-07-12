import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// modules
import { AppRoutingModule } from './app-routing.module';
import { AppStoreModule } from './app-store.module';

// components
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppStoreModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
