import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { MemberProvider } from '../../providers/member/member';

@IonicPage()
@Component({
  selector: 'page-member-list',
  templateUrl: 'member-list.html',
})
export class MemberListPage {

  type: string = 'modal';
  next: any = {
    page: 'WritePage',
    icon: 'checkmark',
  };

  authMember: any = {};
  friendsData: Array<any> = [];
  friendsDataFilter: Array<any> = [];

  constructor(
    public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewController: ViewController,
    public memberProvider: MemberProvider,
  ) { }

  ionViewDidLoad() {
    this.getFriends();
  }

  friendFilter(event): void {
    // value
    this.friendsDataFilter = this.friendsData;
    // input value
    let val = event.target.value;
    if (val && val.trim() !== '') {
      this.friendsDataFilter = this.friendsDataFilter.filter((friend, index, array) => {
        return friend.name.toLowerCase().includes(val.toLowerCase());
      });
    };
  }

  /**
   *  Get Friend
   */
  async getFriends(): Promise<any> {
    this.authMember = await this.storage.get('member');
    this.friendsData = await this.memberProvider.getFriends(this.authMember.uid);
    this.friendsDataFilter = this.friendsData;
  }

  /**
   *  Close Modal
   * @param  {boolean} bool
   */
  dismiss(bool: boolean) {
    if (bool) {
      this.viewController.dismiss();
    } else {
      // todo
    }
  }

}
