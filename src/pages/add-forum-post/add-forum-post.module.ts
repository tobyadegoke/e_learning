import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddForumPostPage } from './add-forum-post';

@NgModule({
  declarations: [
    AddForumPostPage,
  ],
  imports: [
    IonicPageModule.forChild(AddForumPostPage),
  ],
})
export class AddForumPostPageModule {}
