import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';

import { MemberProvider } from '../../providers/member/member';

@IonicPage()
@Component({
  selector: 'page-mypage',
  templateUrl: 'mypage.html',
})
export class MypagePage {

  authMember: any = {};
  friendsData: Array<any> = [];
  loader: any;

  constructor(
    public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalController: ModalController,
    public loadingController: LoadingController,
    public memberProvider: MemberProvider,
  ) { }

  ionViewDidLoad() {
    this.getFriends();
  }

  goFriendAdd(): void {
    let memberSearchModal = this.modalController.create('MemberSearchPage');

    memberSearchModal.present();
    memberSearchModal.onDidDismiss(() => {
      this.getFriends();
    });
  }

  presentMemberDetailModal(value): void {
    let memberDetailModal = this.modalController.create('MemberDetailPage', {profile: value, friend: true});
    
    memberDetailModal.present();
  }

  presentLoading(): void {
    this.loader = this.loadingController.create({
      spinner: 'dots'
    });

    this.loader.present();
  }

  dismissLoading(): void {
    this.loader.dismiss();
  }

  /**
   *  Get Friend
   */
  async getFriends(): Promise<any> {
    this.authMember = await this.storage.get('member');
    this.friendsData = await this.memberProvider.getFriends(this.authMember.uid);
  }

  /**
   *  Search Member By Id
   * @param  {string} uid
   * @param  {string} key
   */
  async deleteFriend(uid: string, key: string): Promise<any> {
    // loading start
    this.presentLoading();
    // delete friend
    await this.memberProvider.deleteFriend(uid, key);
    await this.getFriends();
    // loading start
    this.dismissLoading();
  }

}
