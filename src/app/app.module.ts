import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modulos
import { AppRoutingModule } from './app-routing.module';

import { ReactiveFormsModule } from '@angular/forms'
//fireBase
import { AngularFireModule } from '@angular/fire'
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';


import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';

import { AuthModule } from './auth/auth.module';
;
import { IngresoEgresoModule } from './ingreso-egreso/ingreso-egreso.module';


@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,


    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,



    StoreModule.forRoot(appReducers, {
      runtimeChecks: {
        strictActionImmutability: false,
        strictStateImmutability: false
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
