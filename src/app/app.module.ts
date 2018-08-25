import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SHARED_DECLARATIONS, SHARED_IMPORTS, SHARED_PROVIDERS } from './app.common';

@NgModule({
  declarations: [
    ...SHARED_DECLARATIONS
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...SHARED_IMPORTS
  ],
  providers: [
    ...SHARED_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
