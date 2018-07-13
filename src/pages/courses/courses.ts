import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { CourseDetailPage } from '../course-detail/course-detail';

@IonicPage()
@Component({
  selector: 'page-courses',
  templateUrl: 'courses.html',
})
export class CoursesPage {

  user;
  courses;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserProvider) {
    this.user = JSON.parse(localStorage.getItem('myAppUser'));
    let semester = this.user['semester'];
    let department = this.user['department'];

    this.userService.getStudentCourses(department, semester).subscribe((resp) => {
      this.courses = resp;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoursesPage');
  }

  goToCourseDetail(courseCode){
    console.log(courseCode);
    localStorage.setItem("myAppCourseCode", courseCode);
    this.navCtrl.push(CourseDetailPage);
  }

}
