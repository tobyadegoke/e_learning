import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import { UserProfileProvider } from '../../providers/profile/profile';

@NgModule({
  declarations: [RegisterPage],
  imports: [IonicPageModule.forChild(RegisterPage)],
  providers: [UserProfileProvider]
})
export class RegisterPageModule {}
