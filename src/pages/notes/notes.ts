import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { NotesProvider } from "../../providers/notes/notes";
import { AlertProvider } from "../../providers/alert/alert";

/**
 * Generated class for the NotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-notes",
  templateUrl: "notes.html"
})
export class NotesPage {
  noteList$ = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private noteProvider: NotesProvider,
    private alertProvider: AlertProvider
  ) {}

  ionViewDidLoad() {
    this.alertProvider.showLoader(() => {
      this.noteProvider
        .getList()
        .subscribe((res: any) => {
          this.noteList$ = res;
        });

      this.alertProvider.dismissLoader();
    });
  }

  goToNotesadd() {
    this.navCtrl.push("NotesaddPage");
  }

  goToNotesdetail(n) {
    this.navCtrl.push("NotesdetailPage", n);
  }
}
