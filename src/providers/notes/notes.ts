import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { Note } from "./note.model";
import { TokenProvider } from "../token/token";

@Injectable()
export class NotesProvider {
  constructor(
    public fs: AngularFirestore,
    private tokenProvider: TokenProvider
  ) {}

  notesEndpoint = "noteList";

  getList() {
    return this.fs
      .collection(this.notesEndpoint, _ =>
        _.where("userId", "==", this.tokenProvider.getCurrentUser().uid)
      )
      .valueChanges();
  }

  getById(id: string) {
    return this.fs.doc(`${this.notesEndpoint}/${id}`);
  }

  delete(id: string) {
    this.fs.doc(`${this.notesEndpoint}/${id}`).delete();
  }

  update(id: string, data: any) {
    delete data.id;
    let note = new Note();
    note = <any>{ ...note, ...data };
    return this.fs.doc(`${this.notesEndpoint}/${id}`).update(note);
  }

  create(note: Note) {
    let newNote = { ...note };
    newNote.id = this.fs.createId();
    newNote.userId = this.tokenProvider.getCurrentUser().uid;
    return this.fs.collection(this.notesEndpoint).add(newNote);
  }
}
