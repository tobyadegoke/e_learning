import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-course-detail',
  templateUrl: 'course-detail.html',
})

export class CourseDetailPage {
  courseCode;
  courseDetail;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserProvider) {
    this.courseCode = localStorage.getItem('myAppCourseCode');
    this.userService.getCourseDetail(this.courseCode).subscribe(resp => {
      console.log(resp);
      this.courseDetail = resp;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourseDetailPage');
  }

}
