import { AbstractControl, ValidatorFn } from '@angular/forms';

export class PasswordValidation {
  static matchPassword(control: AbstractControl): ValidatorFn {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;
    if (password !== confirmPassword) {
      control.get('confirmPassword').setErrors({ matchPassword: true });
    } else {
      return null;
    }
  }
}
