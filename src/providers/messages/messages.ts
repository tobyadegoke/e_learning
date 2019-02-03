import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

/*
  Generated class for the MessagesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessagesProvider {
  messagesEndpoint = 'messages';
  constructor(private fs: AngularFirestore, ) {
  }

  getList(){
    return this.fs.collection(this.messagesEndpoint).snapshotChanges();
  }

  getById(id:string){
    this.fs.doc(`${this.messagesEndpoint}/${id}`)
  }

  delete(id:string){
    this.fs.doc(`${this.messagesEndpoint}/${id}`).delete();
  }

  update(id:string, data:any){
    delete data.id;
    this.fs.doc(`${this.messagesEndpoint}/${id}`).update(data);
  }

  create(data: Message){
    return this.fs.collection(this.messagesEndpoint).add(data);
  }

  getMessagesForUser(){

  }  
  
  getBroadcastedMessages(){

  }

}

export class Message {
   id?: string;
   lecturerId:string;
   studentId:string;
   message: string;
   createdOn: any;
   likes: string[];
}
