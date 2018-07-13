import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { RegistrationPage } from '../registration/registration'
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LecturerPage } from '../lecturer/lecturer';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  loginError: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public auth: AuthServiceProvider,
    public fb: FormBuilder
  ) {
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    console.log("Logging in user...");
    
    let data = this.loginForm.value;

    if(!data.email){
      return;
    }

    let credentials = {
      email: data.email,
      password: data.password
    };

    this.auth.login(credentials).subscribe((resp) => {
      console.log(resp);
      if(resp['msg'] == "Success"){
        if(resp['userType'] == "Student"){
          localStorage.setItem('myappEmail', credentials.email);
          localStorage.setItem('myappUserType', resp['userType']);
          this.navCtrl.setRoot(HomePage);
        }else if(resp['userType'] == "Lecturer"){
          localStorage.setItem('myappEmail', credentials.email);
          localStorage.setItem('myappUserType', resp['userType']);
          this.navCtrl.setRoot(LecturerPage);
        }
      }
    });
  }

  goToRegistration(){
    this.navCtrl.setRoot(RegistrationPage);
  }

}
