import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class FirebaseServiceProvider {

  constructor(public http: HttpClient, 
    //public angularFireDB: AngularFireDatabase
  ) {
    console.log('Hello FirebaseServiceProvider Provider');
  }

  select(){
    //return this.angularFireDB.list('/items/');
  }

  add(item){
    //return this.angularFireDB.list('/items').push(item);
  }

  getAdmins(){
    //return this.angularFireDB.list('/admin')
  }

}
