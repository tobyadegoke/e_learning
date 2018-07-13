import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { AngularFireAuth } from 'angularfire2/auth';
//import * as firebase from 'firebase/app';
//import AuthProvider = firebase.auth.AuthProvider;

@Injectable()
export class AuthServiceProvider {
  //private user: firebase.User;

  constructor(
    public http: HttpClient, 
    //public afAuth: AngularFireAuth
  ) {
    console.log('Hello AuthServiceProvider Provider');
    //afAuth.authState.subscribe(user => {
    //  this.user = user;
    //});
  }

  /*signInWithEmail(credentials){
    console.log('Sign in with email');
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
  }*/

  //register(credentials){
  //  return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  //}

  login(credentials){
    return this.http.post('http://localhost:82/myapp/user/login', credentials);
  }

  registerStudent(credentials){
    return this.http.post('http://localhost:82/myapp/student_user/register', credentials);
  }

  getUserProfile(email){
    return this.http.get('http://localhost:82/myapp/student_user/profile?email=' + email);
  }

}
