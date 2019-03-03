import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotesaddPage } from './notesadd';

@NgModule({
  declarations: [
    NotesaddPage,
  ],
  imports: [
    IonicPageModule.forChild(NotesaddPage),
  ],
})
export class NotesaddPageModule {}
