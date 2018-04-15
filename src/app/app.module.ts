import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';

import { ComponentsModule } from '../components/components.module';

//Page
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { FindPasswordPage } from '../pages/find-password/find-password';
import { HomePage } from '../pages/home/home';

//Provider
import { AuthProvider } from '../providers/auth/auth';
import { MemberProvider } from '../providers/member/member';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    HomePage,
    FindPasswordPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase, 'ChatOnMap'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    ComponentsModule
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    HomePage,
    FindPasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    MemberProvider
  ]
})
export class AppModule {}
