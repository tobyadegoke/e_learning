import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { first } from 'rxjs/operators';
import { AlertController } from 'ionic-angular';
import { UserProfileProvider } from '../profile/profile';

@Injectable()
export class AuthServiceProvider {
  user: any;

  constructor(
    public http: HttpClient,
    public afAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    private profileProvider: UserProfileProvider
  ) {}

  isLoggedIn() {
    return this.afAuth.authState.pipe(first());
  }

  login(loginCreds: { email: string; password: string }) {
    const promise = this.afAuth.auth.signInWithEmailAndPassword(loginCreds.email, loginCreds.password);
    this.handlePromise(promise);

    return promise;
  }

  register(registerCreds: { email: string; password: string }) {
    const promise = this.afAuth.auth.createUserWithEmailAndPassword(registerCreds.email, registerCreds.password);
    promise.then(_ => this.profileProvider.create(_));
    this.handlePromise(promise);
    return promise;
  }

  passwordReset(email: string) {
    const promise = this.afAuth.auth.sendPasswordResetEmail(email);
    this.handlePromise(promise);
    return promise;
  }

  logout() {
    const promise = this.afAuth.auth.signOut();
    this.handlePromise(promise);
    return promise;
  }

  handlePromise(promise): any {
    promise
      .then(() => {
        // do something general here
      })
      .catch(err => this.alertCtrl.create({ title: 'Info!', message: err.message, buttons: ['Ok'] }));
  }
}
