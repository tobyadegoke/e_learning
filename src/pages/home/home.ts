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

  constructor(public navCtrl: NavController, public auth: AuthServiceProvider) {
    this.email = localStorage.getItem('myappEmail');
    console.log('This is constructor...');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.auth.getUserProfile(this.email).subscribe(resp => {
      console.log(resp[0]);
      this.userProfile = resp[0];
      localStorage.setItem('myAppUser', JSON.stringify(this.userProfile));
    });
  }

  goToProfile() {
    this.navCtrl.push('ProfilePage');
  }

  goToNotifications() {
    this.navCtrl.push('NotificationsPage');
  }

  goToCourses() {
    this.navCtrl.push('CoursesPage');
  }

  goToForum() {
    this.navCtrl.push('ForumPage');
  }

  goToVideos() {
    this.navCtrl.push('VideosPage');
  }

  logout() {
    localStorage.removeItem('myappEmail');
    this.navCtrl.setRoot('LoginPage');
  }
}
