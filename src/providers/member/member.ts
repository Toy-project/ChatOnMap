import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';

import { Observable } from 'rxjs/observable';

@Injectable()
export class MemberProvider {

  memberCollection: AngularFirestoreCollection<any>;

  constructor(
    public storage: Storage,
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
   * Search Member By Id
   * @param  {string} id
   */
  async searchMemberById(id: string): Promise<any> {
    try {
     // member collection 
     const collection = await this.afStore.firestore.collection('member').where('id', '==', id).get();
     
     // collection 존재 여부에 따른 분기
     if(collection.docs.length === 0) {
       return null;
     } else {
       return collection.docs[0].data();
     }
    } catch(err) {
     console.log(err);
    }
  }

  /**
   * Get Friends
   * @param  {string} uid
   * @param  {string} type
   */
  getFriends(uid: string, type: string): Observable<any> {
    return this.afStore.collection('member').doc(uid).collection('friend').snapshotChanges();
  }

  /**
   * Add Friend
   * @param  {string} uid
   * @param  {string} f_uid
   */
  async addFriend(uid: string, f_uid: string): Promise<any> {
    try {
      // firend collection
      const collection = this.afStore.firestore.collection('member').doc(uid).collection('friend');
      
      await collection.add({
        uid: f_uid,
        type: 'common' // common, hide, block
      });
    } catch(err) {
      console.log(err);
    }
  }

  /**
   * Update Friend Type
   * @param  {string} uid
   * @param  {string} key
   * @param  {string} type
   */
  async updateFriendType(uid: string, key: string, type: string): Promise<any> {
    try {
      // firend collection
      await this.afStore.firestore.collection('member').doc(uid).collection('friend').doc(key).update({
        type: type
      });
      return true;
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
      await this.afStore.firestore.collection('member').doc(uid).collection('friend').doc(key).delete();
      return true;
    } catch(err) {
      console.log(err);
    }
  }

  /**
   * Exist Friend
   * @param  {string} uid
   * @param  {string} f_uid
   */
  async existsFriend(uid: string, f_uid: string): Promise<any> {
    try {
      // friend collection
      const collection = await this.afStore.firestore.collection('member').doc(uid).collection('friend').where('uid', '==', f_uid).get();

      if (collection.docs.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch(err) {
      console.log(err);
    }
  }

}
