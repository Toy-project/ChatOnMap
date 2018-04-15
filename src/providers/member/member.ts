import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@Injectable()
export class MemberProvider {
  userCollection: AngularFirestoreCollection<any>;
  constructor(public afStore: AngularFirestore, public afAuth: AngularFireAuth) {
    this.userCollection = this.afStore.collection('users');
  }

  /**
   * Register Provider
   * @param  {string} email
   * @param  {string} password
   */
  async signup(value): Promise<any> {
    try {
      const email = value.controls['email'].value;
      const password = value.controls['password'].value;
      const name = value.controls['name'].value;

      //유저를 생성
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);

      //이름과 이메일을 저장소에 저장(이메일이 고유키)
      await this.userCollection.doc(email).set({
        'name': name
      });

      if(result) {
        try {
          console.log('-----------------------------------------');
          console.log('firebase.auth().currentUser :', firebase.auth().currentUser);
          console.log('-----------------------------------------');
          //Send verification email
          await firebase.auth().currentUser.sendEmailVerification();
        } catch (e) {
          // this.errorToast(e);
        }
      }

      return result;
    } catch (e) {
      console.log('-----------------------------------------');
      console.log('e :', e);
      console.log('-----------------------------------------');
      // this.errorToast(e);
    }
  }

}
