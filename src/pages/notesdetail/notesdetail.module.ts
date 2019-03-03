import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotesdetailPage } from './notesdetail';

@NgModule({
  declarations: [
    NotesdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(NotesdetailPage),
  ],
})
export class NotesdetailPageModule {}
