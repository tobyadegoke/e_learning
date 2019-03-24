import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizquestionPage } from './quizquestion';

@NgModule({
  declarations: [
    QuizquestionPage,
  ],
  imports: [
    IonicPageModule.forChild(QuizquestionPage),
  ],
})
export class QuizquestionPageModule {}
