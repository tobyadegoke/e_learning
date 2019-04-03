import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Note } from './note.model';

@Injectable()
export class NotesProvider {

  constructor(public fs: AngularFirestore) {
  }

  notesEndpoint = 'noteList'

  getList() {
    return this.fs.collection(this.notesEndpoint).snapshotChanges();
  }

  getById(id: string) {
    return this.fs.doc(`${this.notesEndpoint}/${id}`).snapshotChanges();
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
    return this.fs.collection(this.notesEndpoint).add(newNote);
  }

}
