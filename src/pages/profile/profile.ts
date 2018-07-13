import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
//import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
//import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable'
import { StudentProfileEditPage } from '../student-profile-edit/student-profile-edit';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {

  userProfile;
  email: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public auth: AuthServiceProvider
    //public FSProvider: FirebaseServiceProvider,
    //public afDB: AngularFireDatabase
  ) {
    //this.admins = this.afDB.list('admin').valueChanges();
    //console.log(this.admins);
    //this.email = localStorage.getItem('myappEmail');
    //this.userProfile = JSON.parse(localStorage.getItem('myAppUser'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.email = localStorage.getItem('myappEmail');
    this.userProfile = JSON.parse(localStorage.getItem('myAppUser'));
  }

  goToEditProfile(){
    this.navCtrl.push(StudentProfileEditPage);
  }

}
