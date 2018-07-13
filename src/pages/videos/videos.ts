import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VideoPlayer } from '@ionic-native/video-player';

@IonicPage()
@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html',
})
export class VideosPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public videoPlayer: VideoPlayer
  ) {
    this.videoPlayer.play('http://localhost:82/myapp/public/videos/Video_One.mp4').then(() => {
      console.log('video completed');
      }).catch(err => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideosPage');
  }

  

}
