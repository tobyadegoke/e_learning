import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { TokenProvider } from "../token/token";

/*
  Generated class for the MessagesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessagesProvider {
  messagesEndpoint = "messages";
  constructor(
    private fs: AngularFirestore,
    private tokenProvider: TokenProvider
  ) {}

  getList() {
    return this.fs
      .collection(this.messagesEndpoint, _ => _.orderBy("createdOn"))
      .valueChanges();
  }

  getById(id: string) {
    this.fs.doc(`${this.messagesEndpoint}/${id}`);
  }

  delete(id: string) {
    this.fs.doc(`${this.messagesEndpoint}/${id}`).delete();
  }

  update(id: string, data: any) {
    delete data.id;
    this.fs.doc(`${this.messagesEndpoint}/${id}`).update(data);
  }

  create(data: Message, receiverId: string) {
    data.id = this.fs.createId();
    data.senderId = this.tokenProvider.getCurrentUser().uid;
    data.receiverId = receiverId;
    data.createdOn = Date.now();
    return this.fs.doc(this.messagesEndpoint + "/" + data.id).set({ ...data });
  }
}

export class Message {
  id?: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdOn: any;
  likes: string[];

  constructor(data?: any) {
    data = data || {};
    this.id = data.id || "";
    this.senderId = data.senderId || "";
    this.receiverId = data.receiverId || "";
    this.message = data.message || "";
    this.createdOn = data.createdOn || "";
    this.likes = data.likes || "";
  }
}
