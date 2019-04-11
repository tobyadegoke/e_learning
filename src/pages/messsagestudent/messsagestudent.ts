import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AlertProvider } from "../../providers/alert/alert";
import { UserProfileProvider } from "../../providers/profile/profile";
import _ from "lodash";
import { TokenProvider } from "../../providers/token/token";

@IonicPage()
@Component({
  selector: "page-messsagestudent",
  templateUrl: "messsagestudent.html"
})
export class MesssagestudentPage {
  profileList$ = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private profileProvider: UserProfileProvider,
    private alertProvider: AlertProvider,
    private tokenProvider: TokenProvider
  ) {}

  ionViewDidLoad() {
    this.alertProvider.showLoader(() => {
      this.profileProvider.getList().subscribe((res: any) => {
        const user = this.tokenProvider.getCurrentUser();
        var arr = [];
        res.forEach((val: any) => {
          if (val.userId !== user.uid) {
            arr.push(val);
          }
        });
        this.profileList$ = arr;
      });
      this.alertProvider.dismissLoader();
    });
  }

  goToMessaging(m) {
    this.navCtrl.push("MessagingPage", m);
  }
}
