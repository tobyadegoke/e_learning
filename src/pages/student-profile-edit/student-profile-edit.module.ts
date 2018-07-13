import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentProfileEditPage } from './student-profile-edit';

@NgModule({
  declarations: [
    StudentProfileEditPage,
  ],
  imports: [
    IonicPageModule.forChild(StudentProfileEditPage),
  ],
})
export class StudentProfileEditPageModule {}
