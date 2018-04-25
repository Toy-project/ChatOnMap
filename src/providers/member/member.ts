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
      const email = value.email
      const password = value.password;
      const name = value.name;
      const id = value.id;

      //유저를 생성
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);

      //이름과 이메일을 저장소에 저장(이메일이 고유키)
      await this.memberCollection.doc(result.uid).set({
        'name': name,
        'email': result.email,
        'id': id,
        'photoURL': '',
        'createdAt': new Date(result.metadata.creationTime).getTime(),
        'lastLoginedAt': new Date(result.metadata.lastSignInTime).getTime(),
        'uid': result.uid
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
        return doc.data();
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
      // firend collection
      const collection = await this.afStore.firestore.collection('member').doc(uid).collection('friend').get();
      
      // document 존재 여부에 따른 분기
      if (collection.docs.length === 0) {
        // todo
      } else {
        let firends: Array<any> = [];
        await Promise.all(
          collection.docs.map(async (doc) => {
            const member = await this.afStore.firestore.collection('member').doc(doc.data().uid).get();
            firends.push(Object.assign({key: member.id}, member.data()));
          })
        )
        // 가나다순 정렬 후 return
        return firends.sort((a, b) => { return a.name < b.name ? -1 : a.name > b.name ? 1 : 0; });
      }
    } catch(err) {
      console.log(err);
    }
  }

  /**
   * Add Friend
   * @param  {string} uid
   */
  async addFriend(uid: string): Promise<any> {
    try {
      // firend collection
      const collection = this.afStore.firestore.collection('member').doc(uid).collection('friend');
      
      await collection.add({uid: uid});
    } catch(err) {
      console.log(err);
    }
  }

  /**
   * Delete Friend
   * @param  {string} uid
   * @param  {string} key
   */
  async deleteFriend(uid: string, key: string): Promise<any> {
    try {
      // friend doc
      const doc = this.afStore.firestore.collection('member').doc(uid).collection('friend').doc(key);

      await doc.delete();
    } catch(err) {
      console.log(err);
    }
  }

}
