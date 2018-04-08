import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';

//Page
import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  pushPage: any;

  constructor( public authProvider: AuthProvider ) {
    //navgation to sign up page
    this.signupPage = SignupPage;
  }

  /**
   *  login
   * @param  {string} email
   * @param  {string} password
   */
  login(email, password) {
    try {
      //Try to login
      this.authProvider.login(email, password);
    } catch (e) {
      console.log(e);
    }
  }

}
