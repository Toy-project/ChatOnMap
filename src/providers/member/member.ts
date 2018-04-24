import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable()
export class MemberProvider {

  memberCollection: AngularFirestoreCollection<any>;

  constructor(
    public afStore: AngularFirestore,
    public afAuth: AngularFireAuth,
    public afStorage: AngularFireStorage,
  ) {
    this.memberCollection = this.afStore.collection('member');
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
      await this.memberCollection.doc(email).set({
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
          return e;
        }
      }

      return result;
    } catch (e) {
      console.log('-----------------------------------------');
      console.log('e :', e);
      console.log('-----------------------------------------');

      return e;
    }
  }

  /**
   * Get Member
   * @param  {string} uid
   */
   async getMember(uid: string): Promise<any> {
     try {
      // member document 
      const doc = await this.afStore.firestore.collection('member').doc(uid).get();
      
      // document 존재 여부에 따른 분기
      if(!doc.exists) {
        // todo
      } else {
        return Object.assign({uid: uid}, doc.data());
      }
     } catch(err) {
      console.log(err);
     }
   }

  /**
   * Get Friends
   * @param  {string} uid
   */
  async getFriends(uid: string): Promise<any> {
    try {
      // firend document
      const doc = await this.afStore.firestore.collection('friend').doc(uid).get();
      
      // document 존재 여부에 따른 분기
      if (!doc.exists) {
        // todo
      } else {
        let firends: Array<any> = [];
        await Promise.all(
          doc.data().uid.map(async (uid) => {
            const member = await this.afStore.firestore.collection('member').doc(uid).get();
            firends.push(member.data());
          })
        )
        // 가나다순 정렬 후 return
        return firends.sort((a, b) => { return a.name < b.name ? -1 : a.name > b.name ? 1 : 0; });
      }
    } catch(err) {
      console.log(err);
    }
  }

}
