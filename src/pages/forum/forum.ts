import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { AddForumPostPage } from '../add-forum-post/add-forum-post';
import { RemoveForumPostPage } from '../remove-forum-post/remove-forum-post';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-forum',
  templateUrl: 'forum.html',
})
export class ForumPage {
  user;
  posts;
  msg;
  addCommentForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: UserProvider, 
    public fb: FormBuilder
  ) {
    console.log("Forum constructor");
    this.user = JSON.parse(localStorage.getItem('myAppUser'));
    let semester = this.user['semester'];
    let department = this.user['department'];

    this.addCommentForm = fb.group({
      comment: ['', Validators.compose([Validators.required, Validators.maxLength(280)])]
    });

    this.userService.getStudentForumPosts(semester, department).subscribe((resp) => {
      console.log(resp);
      if(resp['msg']){
        this.msg = resp['msg'];
      }else{
        this.posts = resp;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForumPage');
  }

  addForumComment(postID){
    let data = this.addCommentForm.value;

    let credentials = {
      id: postID,
      comment: data.comment,
    };

    console.log(credentials);
  }

  goToAddPost(){
    this.navCtrl.push(AddForumPostPage);
  }

  goToRemovePost(){
    this.navCtrl.push(RemoveForumPostPage);
  }

}
