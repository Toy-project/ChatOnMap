import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MemberProvider } from '../../providers/member/member';

@IonicPage()
@Component({
  selector: 'page-mypage',
  templateUrl: 'mypage.html',
})
export class MypagePage {

  // set friends data
  public friendsData: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public memberProvider: MemberProvider,
  ) { }

  ionViewDidLoad() {
    this.getFriends();
  }

  async getFriends() {
    this.friendsData = await this.memberProvider.getFriends('R13W5kpxaOCEYPXEEneq');
  }

  searchFriends(event): void {
    // value
    let val = event.target.value;
    console.log(val);
  }

}
