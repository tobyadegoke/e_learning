import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';


@IonicPage()
@Component({
  selector: 'page-add-forum-post',
  templateUrl: 'add-forum-post.html',
})
export class AddForumPostPage {
  addPostForm: FormGroup;
  addPostError: string;
  user;
  courses;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public fb: FormBuilder, 
    public userService: UserProvider
  ) {
    this.user = JSON.parse(localStorage.getItem('myAppUser'));
    
    this.userService.getStudentCourses(this.user['department'], this.user['semester']).subscribe((resp) => {
      this.courses = resp;
      console.log(this.courses);
    });

    this.addPostForm = fb.group({
      title: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      post: ['', Validators.compose([Validators.required, Validators.maxLength(280)])],
      courseCode: ['', Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddForumPostPage');
  }

  addForumPost(){
    console.log("Sending data...");

    let data = this.addPostForm.value;

    console.log(data);

    let credentials = {
      id: "",
      title: data.title,
      author: this.user['email'],
      post: data.post,
      courseCode: data.courseCode
    };

    this.userService.addForumPost(credentials).subscribe((resp) => {
      console.log(resp);
      if(resp['msg'] == "Success"){
        console.log("working");
      }
    });
  }

}
