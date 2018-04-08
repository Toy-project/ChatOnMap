import { Injectable } from '@angular/core';

import { ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@Injectable()
export class AuthProvider {

  constructor( public afAuth: AngularFireAuth, public toastCtrl: ToastController ) {
  }
  /**
   * Login Provider
   * @param  {string} email
   * @param  {string} password
   */
  async login(email:string, password:string):any {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(email, password);

      console.log('-----------------------------------------');
      console.log('result :', result);
      console.log('-----------------------------------------');

      if(result) {
        return result;
      }
    } catch (e) {
      this.errorToast(e);
    }
  }

  /**
   * Register Provider
   * @param  {string} email
   * @param  {string} password
   */
  async signup(email:string, password:string):any {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);

      if(result) {
        console.log('-----------------------------------------');
        console.log('result :', result);
        console.log('-----------------------------------------');
        //Send verification email
        try {
          console.log('-----------------------------------------');
          console.log('firebase.auth().currentUser :', firebase.auth().currentUser);
          console.log('-----------------------------------------');
          const result = await firebase.auth().currentUser.sendEmailVerification();

          if(result) {
            console.log('sent email');
          }
        } catch (e) {
          this.errorToast(e);
        }
      }
    } catch (e) {
      this.errorToast(e);
    }
  }

  //Logout
  async logout():any {
    try {
      const result = await this.afAuth.auth.signOut();

      console.log('-----------------------------------------');
      console.log('result :', result);
      console.log('-----------------------------------------');

      if(result) {
        return result;
      }
    } catch (e) {
      this.errorToast(e);
    }
  }

  /**
   * Error Toast Message
   * @param  {string} code 에러 코드
   */
  errorToast( error:string ):void {
    console.log('-----------------------------------------');
    console.log('code :', error.message);
    console.log('-----------------------------------------');
    let msg:string;

    switch(error.code) {
        case 'auth/invalid-email': msg = '이메일 주소를 다시 한 번 확인해주세요.'; break;
        case 'auth/wrong-password': msg = '비밀번호를 다시 한 번 확인해주세요.'; break;
        case 'auth/user-not-found': msg = '회원가입을 하신 후 이용해주세요.'; break;
        case 'email-already-in-use': msg = '현재 가입된 정보가 있습니다.'; break;
        default: msg = error.message; break;
    }

    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

}
