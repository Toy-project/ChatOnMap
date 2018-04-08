import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor( public authProvider: AuthProvider ) {
  }

  /**
   *  Sign up
   * @param  {string} email
   * @param  {string} password
   */
  signup(email, password) {
    try {
      //Try to login
      this.authProvider.signup(email, password);
    } catch (e) {
      console.log(e);
    }
  }

}
