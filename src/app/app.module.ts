import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { VideoPlayer } from '@ionic-native/video-player';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { UserProvider } from '../providers/user/user';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { config } from './app.config';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { MessagesProvider } from '../providers/messages/messages';
import { ProfileProvider } from '../providers/profile/profile';

@NgModule({
  declarations: [MyApp, HomePage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularFireModule.initializeApp(config.firebase),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage],
  providers: [
    StatusBar,
    VideoPlayer,
    SplashScreen,
    UserProvider,
    AuthServiceProvider,
    MessagesProvider,
    ProfileProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
