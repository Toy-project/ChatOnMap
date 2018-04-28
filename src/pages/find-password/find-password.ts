import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { AlertController } from 'ionic-angular';

//providers
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-find-password',
  templateUrl: 'find-password.html',
})
export class FindPasswordPage {
  findPasswordLoader: any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authProvider:AuthProvider,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
  }

  presentLoading(): void {
    this.findPasswordLoader = this.loadingCtrl.create({
      spinner: 'dots'
    });

    this.findPasswordLoader.present();
  }

  dismissLoading(): void {
    this.findPasswordLoader.dismiss();
  }

  warningMsg(contents: string): void {
    const alert = this.alertCtrl.create({
      subTitle: contents,
      buttons: ['OK']
    });
    alert.present();
  }

  async findPassword(name, email): Promise<any> {
    console.log('[name, email] :', name, email);
    if(!name) {
      this.warningMsg('이름을 입력해주세요.');
      return false;
    }
    if(!email) {
      this.warningMsg('이메일을 입력해주세요.');
      return false;
    }
    try {
      this.presentLoading();
      const result = this.authProvider.setNewPasswordByEmail(email);

      console.log('[result] :', result);
      if(result) {
        this.warningMsg('이메일을 확인하신 후 비밀번호를 변경해 주세요.');
        this.navCtrl.push('LoginPage');
        this.dismissLoading();
      } else {

      }
    } catch (e) {
      throw e;
    }
  }

}
