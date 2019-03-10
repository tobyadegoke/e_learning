import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForumaddPage } from './forumadd';

@NgModule({
  declarations: [
    ForumaddPage,
  ],
  imports: [
    IonicPageModule.forChild(ForumaddPage),
  ],
})
export class ForumaddPageModule {}
