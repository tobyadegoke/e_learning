import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ForumProvider } from "../../providers/forum/forum";
import { ForumComment, Forum } from "../../providers/forum/forum.model";

/**
 * Generated class for the ForumdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-forumdetail",
  templateUrl: "forumdetail.html"
})
export class ForumdetailPage {
  forum = new Forum();
  message: string;
  comments = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private forumProvider: ForumProvider
  ) {}

  ionViewDidLoad() {
    this.forum = this.navParams.data;
    this.getComments();
  }

  getComments() {
    this.forumProvider
      .getForumCommentList(this.forum.id)
      .valueChanges()
      .subscribe(res => {
        this.comments = res;
      });
  }

  saveComment() {
    let forumComment = new ForumComment();
    forumComment.forumId = this.forum.id;
    forumComment.message = this.message;
    this.forumProvider.saveForumComment(forumComment).then(res => {
      this.message = "";
    });
  }
}
