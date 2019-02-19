import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  email: string;
  userProfile;

  constructor(
    public navCtrl: NavController,
    private authServiceProvider: AuthServiceProvider
  ) {
    this.email = localStorage.getItem('myappEmail');
    console.log('This is constructor...');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    // this.auth.getUserProfile(this.email).subscribe(resp => {
    //   console.log(resp[0]);
    //   this.userProfile = resp[0];
    //   localStorage.setItem('myAppUser', JSON.stringify(this.userProfile));
    // });
  }

  goToMessages() {
    this.navCtrl.push('MessagesPage');
  }

  goToAccount() {
    this.navCtrl.push('AccountPage');
  }

  goToForum() {
    this.navCtrl.push('ForumPage');
  }

  goToMedia() {
    this.navCtrl.push('MediaPage');
  }

  goToNotes() {
    this.navCtrl.push('NotesPage');
  }

  goToQuiz() {
    this.navCtrl.push('QuizPage');
  }

  logout() {
    this.authServiceProvider.logout().then(() => {
      this.navCtrl.setRoot('IntroPage');
    });
  }
}
