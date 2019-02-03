import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from './profile.model';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {
  profileEndpoint = 'profiles';
  
  constructor(
    public fs: AngularFirestore, 
   public afAuth: AngularFireAuth
    ) { }

  getList(){
    return this.fs.collection(this.profileEndpoint).snapshotChanges();
  }

  getById(id:string){
    this.fs.doc(`${this.profileEndpoint}/${id}`)
  }

  delete(id:string){
    this.fs.doc(`${this.profileEndpoint}/${id}`).delete();
  }

  update(id:string, data:any){
    delete data.id;
    this.fs.doc(`${this.profileEndpoint}/${id}`).update(data);
  }

  create(data: Profile){
    const dat = {...data};
    return this.fs.collection(this.profileEndpoint).add(dat);
  }

  initProfile(): any {
    let user = this.getCurrentUser(); 
    const profile = new Profile(user);
    profile.userId = user.uid;
    this.create(profile);
  }

  getCurrentUser(){
    const currentUser = this.afAuth.auth.currentUser;
    return currentUser ? currentUser : {uid: "", email: ""} ;
  }
}


