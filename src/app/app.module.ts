import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { VerifyPasswordComponent } from './verify-password/verify-password.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    VerifyPasswordComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp({"projectId":"first-d59a5",
    "appId":"1:856992636853:web:8df8024cd6fb25c42503fc",
    "storageBucket":"first-d59a5.appspot.com",
    "apiKey":"AIzaSyCuIN2rtfOysy7RftytbqjGu2z1OqRHimo",
    "authDomain":"first-d59a5.firebaseapp.com",
    "messagingSenderId":"856992636853"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

    AngularFireModule.initializeApp({"projectId":"first-d59a5",
    "appId":"1:856992636853:web:8df8024cd6fb25c42503fc",
    "storageBucket":"first-d59a5.appspot.com",
    "apiKey":"AIzaSyCuIN2rtfOysy7RftytbqjGu2z1OqRHimo",
    "authDomain":"first-d59a5.firebaseapp.com",
    "messagingSenderId":"856992636853"})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
