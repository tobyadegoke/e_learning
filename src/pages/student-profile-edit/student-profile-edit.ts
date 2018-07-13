import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-student-profile-edit',
  templateUrl: 'student-profile-edit.html',
})
export class StudentProfileEditPage {
  editForm: FormGroup;
  editError: string;
  userProfile;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public fb: FormBuilder,
    public userService: UserProvider,
    public auth: AuthServiceProvider,
    private toast: ToastController,
    private alertCtrl: AlertController
  ) {
    this.userProfile = JSON.parse(localStorage.getItem('myAppUser'));
    this.editForm = fb.group({
      firstName: [this.userProfile['first_name'], Validators.compose([Validators.required])],
      middleName: [this.userProfile['middle_name'], Validators.compose([Validators.required])],
      lastName: [this.userProfile['last_name'], Validators.compose([Validators.required])],
      semester: [this.userProfile['semester'], Validators.compose([Validators.required, Validators.maxLength(1)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentProfileEditPage');
  }

  editProfile(){
    console.log('Editing profile...');
    let data = this.editForm.value;

    let credentials = {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      semester: data.semester,
      email: this.userProfile['email']
    };

    this.userService.editStudentProfile(credentials).subscribe((resp) => {
      console.log(resp);
      if(resp['msg'] == "Success"){
        this.auth.getUserProfile(this.userProfile['email']).subscribe((resp) => {
          console.log(resp[0]);
          this.userProfile = resp[0];
          localStorage.setItem('myAppUser', JSON.stringify(this.userProfile));
          this.presentAlert();
          this.navCtrl.setRoot(HomePage);
        })
      }
    });
  }

  presentAlert(){
    let alert = this.alertCtrl.create({
      title: 'Profile edit',
      subTitle: 'Profile edited succesfully!',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  presentToast(){
    let toast = this.toast.create({
      message: "Profile updated",
      duration: 3000,
      position: "bottom"
    });

    toast.present();
  }

}
