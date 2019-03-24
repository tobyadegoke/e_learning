import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../providers/profile/profile.model';
import { UserProfileProvider } from '../../providers/profile/profile';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  accountForm: FormGroup;
  profile: Profile;
  errMsg: string;
  pinErrMsg: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private profileProvider: UserProfileProvider
  ) {
    this.createAccountForm();
  }

  ionViewDidLoad() {
    this.profileProvider.getById().subscribe(res => {
      const profile = {
        id: res.payload.id,
        ...res.payload.data()
      };
      this.createAccountForm(profile);
    });
  }

  submit() {
    this.pinErrMsg = '';
    if (this.accountForm.value.pin !== '1234' && this.accountForm.value.userType === 'Lecturer') {
      this.pinErrMsg = 'Lecturer Pin invalid';
      return;
    }

    this.profileProvider.update(this.accountForm.value).then(res => {
      this.navCtrl.pop();
    });
  }

  createAccountForm(profile?: any) {
    this.profile = new Profile(profile);
    this.accountForm = this.fb.group({
      email: [this.profile.email, Validators.required],
      semester: [this.profile.semester],
      lastname: [this.profile.lastname, Validators.required],
      firstname: [this.profile.firstname, Validators.required],
      department: [this.profile.department, Validators.required],
      userType: [this.profile.userType],
      displayname: [this.profile.displayname, Validators.required],
      pin: ['']
    });
  }
}
