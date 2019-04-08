import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ForumProvider } from "../../providers/forum/forum";
import { AlertProvider } from "../../providers/alert/alert";

/**
 * Generated class for the ForumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-forum",
  templateUrl: "forum.html"
})
export class ForumPage {
  forumList$ = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private forumProvider: ForumProvider,
    private alertProvider: AlertProvider
  ) {}

  ionViewDidLoad() {
    this.alertProvider.showLoader(() => {
      this.forumProvider
        .getForumList()
        .valueChanges()
        .subscribe((res: any) => {
          this.forumList$ = res;
        });

      this.alertProvider.dismissLoader();
    });
  }

  goToForumadd() {
    this.navCtrl.push("ForumaddPage");
  }

  goToForumdetail(f) {
    this.navCtrl.push("ForumdetailPage", f);
  }
}
