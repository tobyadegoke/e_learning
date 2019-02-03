import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { first } from 'rxjs/operators';

@Injectable()
export class AuthServiceProvider {
  user: any;

  constructor(public http: HttpClient, public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  login(credentials) {
    return this.afAuth.auth.signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
  }

  register(credentials) {
    return this.afAuth.auth.createUserWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
  }

  isLoggedIn() {
    return this.afAuth.authState.pipe(first());
  }

  logout() {
    return this.afAuth.auth.signOut();
  }
}
