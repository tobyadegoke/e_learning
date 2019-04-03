import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController, LoadingOptions } from 'ionic-angular';

@Injectable()
export class AlertProvider {
  loader: any;
  toast: any;
  alert: any;
  constructor(
    public http: HttpClient,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private alertController: AlertController
  ) { }

  showLoader(callback: Function, options?: LoadingOptions) {
    options = { content: 'Loading', ...options };
    this.loader = this.loadingController.create(options);
    this.loader.present().then(result => {
      callback();
    });
  }

  showToast(msg: string, type?: string, duration?: number) {
    this.toast = this.toastController.create({
      message: msg,
      duration: duration || 10000,
      position: 'bottom',
      cssClass: `${type}-toast-style`,
      showCloseButton: true,
      closeButtonText: 'CLOSE',
      dismissOnPageChange: true
    });
    if (msg) this.toast.present();
  }

  dismissLoader() {
    if (this.loader) {
      this.loader.dismiss();
      this.loader = null;
    }
  }

  dismissToast() {
    if (this.toast) {
      this.toast.dismiss();
      this.toast = null;
    }
  }

  confirm(title: string,
    message: string,
    successCallback?: Function,
    failCallback?: Function
  ) {
    this.alert = this.alertController.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            if (failCallback) failCallback();
          }
        },
        {
          text: 'Yes',
          role: 'cancel',
          handler: e => {
            if (successCallback) successCallback(e);
          }
        }
      ]
    });

    this.alert.present();
  }

  confirmWithInput(
    title: string,
    message: string,
    inputName: string,
    successCallback?: Function,
    failCallback?: Function
  ) {
    this.alert = this.alertController.create({
      title: title,
      message: message,
      inputs: [
        {
          name: inputName,
          placeholder: inputName
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            if (failCallback) failCallback();
          }
        },
        {
          text: 'Submit',
          role: 'cancel',
          handler: e => {
            if (successCallback) successCallback(e);
          }
        }
      ]
    });

    this.alert.present();
  }

  dismissConfirm() {
    this.alert.dismiss();
  }
}
