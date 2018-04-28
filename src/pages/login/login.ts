import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, AlertController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { MemberProvider } from '../../providers/member/member';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  constructor(
    public storage: Storage,
    public authProvider: AuthProvider,
    public memberProvider: MemberProvider,
    public nav: NavController,
    public alertCtrl: AlertController
  ) {
  }

  warningMsg(contents: string): void {
    const alert = this.alertCtrl.create({
      subTitle: contents,
      buttons: ['OK']
    });
    alert.present();
  }

  /**
   *  login
   * @param  {string} email
   * @param  {string} password
   */
  async login(email, password): Promise<any> {
    if (!email) {
      this.warningMsg('이메일을 입력해 주세요.');
      return false;
    }
    if (!password) {
      this.warningMsg('비밀번호를 입력해 주세요.');
      return false;
    }
    try {
      //Try to login
      const result = await this.authProvider.getSession(email, password);
      const member = await this.memberProvider.getMember(result.uid);
      const emailVerified: boolean = result.emailVerified;

      console.log('[0] :');
      switch (result.code) {
        case 'auth/wrong-password' : this.warningMsg('비밀번호가 올바르지 않습니다.'); break;
        case 'auth/invalid-email' : this.warningMsg('이메일이 올바르지 않습니다.'); break;
        case 'auth/auth/user-not-found' :
          this.warningMsg('등록되지 않은 계정입니다.');
          this.nav.push('SignupPage');
          break;
        default : break;
      }

      console.log('[1] :');

      //인증이 안된 계정이면 이메일 확인 페이지로 이동
      if(emailVerified) {
        console.log('[2] :', member);
        this.storage.set('member', JSON.parse(JSON.stringify(member)));
        console.log('[3] :');
        this.nav.setRoot('TabsPage');
        console.log('[4] :');
      } else {
        //To do
      }
    } catch (e) {
      console.log(e);
    }
  }

  goToSignupPage() {
    this.nav.push('SignupPage');
  }

  goToFindPasswordPage() {
    this.nav.push('FindPasswordPage');
  }
}
