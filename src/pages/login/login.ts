import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { MemberProvider } from '../../providers/member/member';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  signupPage: any = 'SignupPage';
  findPasswordPage: any = 'FindPasswordPage';
  
  constructor(
    public storage: Storage,
    public authProvider: AuthProvider,
    public memberProvider: MemberProvider,
    public nav: NavController
  ) {
  }

  /**
   *  login
   * @param  {string} email
   * @param  {string} password
   */
  async login(email, password): Promise<any> {
    try {
      //Try to login
      const result = await this.authProvider.getSession(email, password);
      const member = await this.memberProvider.getMember(result.uid);
      const emailVerified: boolean = result.emailVerified;
      console.log('-----------------------------------------');
      console.log('typeof result :', typeof result);
      console.log('-----------------------------------------');
      //인증이 안된 계정이면 이메일 확인 페이지로 이동
      if(emailVerified) {
        this.storage.set('member', JSON.parse(JSON.stringify(member)));
        this.nav.setRoot('TabsPage');
      } else {
        //To do
      }
    } catch (e) {
      console.log(e);
    }
  }

}
