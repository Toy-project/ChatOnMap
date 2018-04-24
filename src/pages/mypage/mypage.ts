import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { MemberProvider } from '../../providers/member/member';

@IonicPage()
@Component({
  selector: 'page-mypage',
  templateUrl: 'mypage.html',
})
export class MypagePage {

  // set friends data
  public friends: Array<any> = [];
  public friendsData: Array<any> = [];

  constructor(
    public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalController: ModalController,
    public memberProvider: MemberProvider,
  ) { }

  ionViewDidLoad() {
    this.getFriends();
  }

  async getFriends() {
    const authMember = await this.storage.get('member');
    this.friends = await this.memberProvider.getFriends(authMember.uid);
    this.friendsData = this.friends;
  }

  searchFriends(event): void {
    // friends set
    this.friendsData = this.friends;
    // input value
    let val = event.target.value;
    // filter event
    if (val && val.trim() !== '') {
      this.friendsData = this.friendsData.filter((friend, index, array) => {
        return friend.name.toLowerCase().includes(val.toLowerCase());
      });
    };
  }

  presentMemberDetailModal(value) {
    let memberDetailModal = this.modalController.create('MemberDetailPage', value);
    
    memberDetailModal.present();
  }

}
