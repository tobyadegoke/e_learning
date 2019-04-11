import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { TokenProvider } from "../token/token";
import { Quiz } from "./quiz.model";

/*
  Generated class for the QuizProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuizProvider {
  quizesEndpoint = "quizList";
  constructor(
    private fs: AngularFirestore,
    private tokenProvider: TokenProvider
  ) {}

  getList() {
    return this.fs
      .collection(this.quizesEndpoint, _ => _.orderBy("createdOn"))
      .valueChanges();
  }

  getById(id: string) {
    this.fs.doc(`${this.quizesEndpoint}/${id}`);
  }

  delete(id: string) {
    this.fs.doc(`${this.quizesEndpoint}/${id}`).delete();
  }

  update(id: string, data: any) {
    delete data.id;
    this.fs.doc(`${this.quizesEndpoint}/${id}`).update(data);
  }

  create(data: Quiz) {
    data.id = this.fs.createId();
    data.lecturerId = this.tokenProvider.getCurrentUser().uid;
    data.createdOn = Date.now();
    data.questionList = JSON.stringify(data.questions);
    const obj = JSON.parse(JSON.stringify(data));
    delete obj.questions;
    return this.fs.doc(this.quizesEndpoint + "/" + data.id).set(obj);
  }
}
