import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';


@IonicPage()
@Component({
  selector: 'page-remove-forum-post',
  templateUrl: 'remove-forum-post.html',
})
export class RemoveForumPostPage {

  user;
  titles;
  msg;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public userService: UserProvider
  ) {
    this.user = JSON.parse(localStorage.getItem('myAppUser'));
    
    this.getForumTitlesByEmail();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemoveForumPostPage');
  }

  removePost(id){
    console.log(id);

    let forumID = {
      id: id
    };

    this.userService.removeForumPost(forumID).subscribe((resp) => {
      console.log(resp['msg']);
      this.getForumTitlesByEmail();
    });
  }

  getForumTitlesByEmail(){
    this.userService.getForumTitlesByEmail(this.user['email']).subscribe((resp) => {
      console.log('titles by user');
      if(resp['msg']){
        this.msg = "No posts by user";
      }else{
        this.titles = resp;
      }
    });
  }

}
