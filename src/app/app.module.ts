import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
