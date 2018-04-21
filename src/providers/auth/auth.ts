import { Injectable } from '@angular/core';

import { AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@Injectable()
export class AuthProvider {

  constructor( public afAuth: AngularFireAuth, public alertCtrl: AlertController) {
  }

  async isLoginin(): Promise<any> {
    try {
      const result = await this.afAuth.authState.subscribe((user) => {
        if (!user) {
          return null;
        }
      });

      return result;
    } catch (e) {
      throw e;
    }
  }
  /**
   * Login Provider
   * @param  {string} email
   * @param  {string} password
   */
  async getSession(email:string, password:string): Promise<any> {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(email, password);

      console.log('-----------------------------------------');
      console.log('this.afAuth.auth.signInWithEmailAndPassword(email, password) :', result);
      console.log('-----------------------------------------');

      return result;
    } catch (e) {
      throw e;
    }
  }

  //Logout
  async logout(): Promise<any> {
    try {
      const result = await this.afAuth.auth.signOut();

      console.log('-----------------------------------------');
      console.log('this.afAuth.auth.signOut(); :', result);
      console.log('-----------------------------------------');

      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 비밀번호 재설정 이메일 보내기
   * @param  {string} email 이메일 주소
   */
  async setNewPasswordByEmail(email: string): Promise<any> {
    try {
      //비밀번호 재설정하는 이메일 보내기
      await firebase.auth().sendPasswordResetEmail(email);
    } catch (e) {
      throw e;
    }
  }

}
