import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LecturerPage } from './lecturer';

@NgModule({
  declarations: [
    LecturerPage,
  ],
  imports: [
    IonicPageModule.forChild(LecturerPage),
  ],
})
export class LecturerPageModule {}
