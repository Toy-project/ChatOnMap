import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';

//Page
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { FindPasswordPage } from '../find-password/find-password';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  signupPage: any = SignupPage;
  findPasswordPage: any = FindPasswordPage;
  constructor( public authProvider: AuthProvider, public nav: NavController ) {
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
      const emailVerified: boolean = result.emailVerified;
      console.log('-----------------------------------------');
      console.log('typeof result :', typeof result);
      console.log('-----------------------------------------');
      //인증이 안된 계정이면 이메일 확인 페이지로 이동
      if(emailVerified) {
        this.nav.push(HomePage);
      } else {
        //To do
      }
    } catch (e) {
      console.log(e);
    }
  }

}
