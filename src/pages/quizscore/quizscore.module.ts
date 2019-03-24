import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizscorePage } from './quizscore';

@NgModule({
  declarations: [
    QuizscorePage,
  ],
  imports: [
    IonicPageModule.forChild(QuizscorePage),
  ],
})
export class QuizscorePageModule {}
