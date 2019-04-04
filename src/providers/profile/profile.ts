import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from './profile.model';
import { AuthServiceProvider } from '../auth-service/auth-service';
import { TokenProvider } from '../token/token';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProfileProvider {
  public profileEndpoint = 'profiles';
  user: { uid: string; email: string };

  constructor(public fs: AngularFirestore, public afAuth: AngularFireAuth, private tokenProvider: TokenProvider) {
    this.user = this.tokenProvider.getCurrentUser();
  }

  getList() {
    return this.fs.collection(this.profileEndpoint).snapshotChanges();
  }

  getById() {
    return this.fs.doc(`${this.profileEndpoint}/${this.user.uid}`).snapshotChanges();
  }

  delete() {
    this.fs.doc(`${this.profileEndpoint}/${this.user.uid}`).delete();
  }

  update(data: any) {
    delete data.id;
    let profile = new Profile();
    profile.profileCompleted = true;
    profile = <any>{ ...profile, ...data };
    return this.fs.doc(`${this.profileEndpoint}/${this.user.uid}`).set(profile, { merge: true });
  }

  create(user) {
    let profile = new Profile();
    profile.userId = user.uid;
    profile.email = user.email;
    profile = <any>{ ...profile };
    this.tokenProvider.setCurrentUser(user);
    return this.fs.doc(`${this.profileEndpoint}/${user.uid}`).set(profile);
  }


}
