import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ForumProvider } from '../../providers/forum/forum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Forum } from '../../providers/forum/forum.model';
import { AlertProvider } from '../../providers/alert/alert';

/**
 * Generated class for the ForumaddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forumadd',
  templateUrl: 'forumadd.html',
})
export class ForumaddPage {
  forumForm: FormGroup;
  forum: Forum;

  constructor(
    private fb: FormBuilder,
    public navParams: NavParams,
    public navCtrl: NavController,
    private forumProvider: ForumProvider,
    private alertProvider: AlertProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForumaddPage');
  }

  saveForum() {
    this.alertProvider.showLoader(() => {
      this.forumProvider.create(this.forumForm.value).then(res => {
        this.alertProvider.dismissLoader();
        this.alertProvider.showToast('Question added!');
        this.goBack();
      }, () => {
        this.alertProvider.dismissLoader();
        this.alertProvider.showToast('Question post failed!');
      });
    })

  }

  createAddForumForm(forum: Forum) {
    this.forum = new Forum(forum);
    this.forumForm = this.fb.group({
      title: [this.forum.title, Validators.required],
      description: [this.forum.description, Validators.required]
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

}
