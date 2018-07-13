import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  user;
  notifications;
  msg;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserProvider) {
    console.log("Notifications constructor");
    this.user = JSON.parse(localStorage.getItem('myAppUser'));
    let semester = this.user['semester'];
    let department = this.user['department'];

    this.userService.getStudentNotifications(semester, department).subscribe((resp) => {
      console.log(resp);
      if(resp['msg']){
        this.msg = resp['msg'];
      }else{
        this.notifications = resp;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

}
