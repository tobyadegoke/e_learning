import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from '../../Validators/password.validation';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserProfileProvider } from '../../providers/profile/profile';
import { HomePage } from '../home/home';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  registerForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private authServiceProvider: AuthServiceProvider
  ) {
    this.createRegisterForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  onRegisterSubmit() {
    this.authServiceProvider.register(this.registerForm.value).then(res => {
      this.navCtrl.setRoot(HomePage);
      this.navCtrl.push('AccountPage');
    });
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        confirmPassword: ['', Validators.required]
      },
      { validator: PasswordValidation.matchPassword }
    );
  }
}
