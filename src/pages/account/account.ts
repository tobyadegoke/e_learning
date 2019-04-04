import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../providers/profile/profile.model';
import { UserProfileProvider } from '../../providers/profile/profile';
import { AlertProvider } from '../../providers/alert/alert';

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
    private profileProvider: UserProfileProvider,
    private alertProvider: AlertProvider
  ) {
    this.createAccountForm();
  }

  ionViewDidLoad() {
    this.alertProvider.showLoader(() => {
      this.profileProvider.getById().subscribe(res => {
        if (res.payload.id) {
          const profile = {
            id: res.payload.id,
            ...res.payload.data()
          };
          this.createAccountForm(profile);
          this.alertProvider.dismissLoader();
        }
      });
    });
  }

  submit() {
    this.pinErrMsg = '';
    if (this.accountForm.value.pin !== '1234' && this.accountForm.value.userType === 'Lecturer') {
      this.pinErrMsg = 'Lecturer Pin invalid';
      return;
    }
    this.alertProvider.showLoader(() => {
      this.profileProvider.update(this.accountForm.value).then(res => {
        this.navCtrl.pop();
        this.alertProvider.dismissLoader();
      });
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
      displayname: [this.profile.displayname, Validators.required],
      userType: [this.profile.userType],
      pin: ['']
    });
  }
}
