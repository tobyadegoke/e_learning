import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from './profile.model';
import { take, tap, map } from 'rxjs/operators';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProfileProvider {
  public profileEndpoint = 'profiles';
  user: { uid: string; email: string };

  constructor(public fs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.getCurrentUser();
  }

  getList() {
    return this.fs.collection(this.profileEndpoint).snapshotChanges();
  }

  getById() {
    return this.fs.doc(`${this.profileEndpoint}/${this.getCurrentUser().uid}`).snapshotChanges();
  }

  delete() {
    this.fs.doc(`${this.profileEndpoint}/${this.getCurrentUser().uid}`).delete();
  }

  update(data: any) {
    delete data.id;
    let profile = new Profile();
    profile.profileCompleted = true;
    profile = <any>{ ...profile, ...data };
    return this.fs.doc(`${this.profileEndpoint}/${this.getCurrentUser().uid}`).set(profile, { merge: true });
  }

  create(user) {
    let profile = new Profile();
    profile.userId = user.uid;
    profile.email = user.email;
    profile = <any>{ ...profile };
    localStorage.setItem('userData', JSON.stringify(user));
    return this.fs.doc(`${this.profileEndpoint}/${user.uid}`).set(profile);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('userData')) || {};
  }
}
