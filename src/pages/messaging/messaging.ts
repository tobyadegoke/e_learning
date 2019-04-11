import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { MessagesProvider, Message } from "../../providers/messages/messages";
import { AlertProvider } from "../../providers/alert/alert";
import { FormGroup } from "@angular/forms";
import { TokenProvider } from "../../providers/token/token";

@IonicPage()
@Component({
  selector: "page-messaging",
  templateUrl: "messaging.html"
})
export class MessagingPage {
  userprofile = {} as any;
  messageList$ = [];
  messageForm: FormGroup;
  content: any;
  user = {} as any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertProvider: AlertProvider,
    private messagesProvider: MessagesProvider,
    private tokenProvider: TokenProvider
  ) {}

  ionViewDidLoad() {
    this.userprofile = this.navParams.data;
    this.user = this.tokenProvider.getCurrentUser();
    this.messagesProvider.getList().subscribe((res: any) => {
      this.messageList$ = res.filter(val => {
        const arr = [val.receiverId, val.senderId];
        return (
          arr.indexOf(this.userprofile.userId) > -1 &&
          arr.indexOf(this.user.uid) > -1
        );
      });
    });
  }

  sendMessage() {
    let msg = new Message();
    msg.message = this.content;
    this.messagesProvider.create(msg, this.userprofile.userId).then(() => {
      this.content = "";
    });
  }
}
