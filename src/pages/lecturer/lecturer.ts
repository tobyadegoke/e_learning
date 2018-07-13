import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreateQuizPage } from '../create-quiz/create-quiz';

/**
 * Generated class for the LecturerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lecturer',
  templateUrl: 'lecturer.html',
})
export class LecturerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LecturerPage');
  }

  goToCreateQuiz(){
    this.navCtrl.push(CreateQuizPage);
  }

}
