import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { tap } from 'rxjs/operators';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private authServiceProvider: AuthServiceProvider
  ) {
    platform.ready().then(() => {
      this.tryGotoHomePage();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  tryGotoHomePage() {
    this.authServiceProvider
      .isLoggedIn()
      .pipe(
        tap(user => {
          if (user) {
            this.rootPage = HomePage;
          } else {
            this.rootPage = 'IntroPage';
          }
        })
      )
      .subscribe();
  }
}
