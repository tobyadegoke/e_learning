import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {
  registrationForm: FormGroup;
  registrationError: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public auth: AuthServiceProvider,
    public fb: FormBuilder
  ) {
    this.registrationForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      semester: ['', Validators.compose([Validators.required])],
      department: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

  register(){
    console.log("Registering user...");
    
    let data = this.registrationForm.value;

    if(!data.email){
      return;
    }

    let credentials = {
      email: data.email,
      semester: data.semester,
      department: data.department,
      userType: 'student',
      password: data.password
    };

    this.auth.registerStudent(credentials).subscribe((resp) => {
      console.log(resp);
      if(resp['msg'] == "Success"){
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }

  goToLogin(){
    this.navCtrl.setRoot(LoginPage);
  }

}
