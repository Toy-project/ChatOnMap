import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ActionSheetController } from 'ionic-angular';

import { MemberProvider } from '../../providers/member/member';

@IonicPage()
@Component({
  selector: 'page-mypage',
  templateUrl: 'mypage.html',
})
export class MypagePage {

  authMember: any = {};
  friendsData: Array<any> = [];
  friendsDataFilter: Array<any> = [];
  loader: any;

  constructor(
    public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalController: ModalController,
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    public memberProvider: MemberProvider,
  ) { }

  ionViewDidLoad() {
    this.getFriends('common');
  }

  /**
   *  Present Member Detail Modal
   * @param  {any} profile
   */
  presentMemberDetailModal(profile: any): void {
    let memberDetailModal = this.modalController.create('MemberDetailPage', {
      profile: profile,
      friend: true,
      modify: this.authMember.uid === profile.uid ? true : false
    });
    
    memberDetailModal.present();
  }

  /**
   *  Present Member Search Modal
   * @param  {any} fab
   */
  presentMemberSearchModal(fab?: any): void {
    let memberSearchModal = this.modalController.create('MemberSearchPage');

    memberSearchModal.present();
    // fab close
    fab ? fab.close() : true;
  }

  /**
   *  Present Member Select List Modal
   * @param  {any} fab
   */
  presentMemberSelectModal(fab?: any): void {
    let memberSelectModal = this.modalController.create('MemberSelectPage', {
      friends: this.friendsData
    });

    memberSelectModal.present();
    // fab close
    fab ? fab.close() : true;
  }

  /**
   *  Present Member Manage Modal
   * @param  {any} fab
   */
  presentMemberManageModal(fab?: any): void {
    let memberManageModal = this.modalController.create('MemberManagePage', {
      authMember: this.authMember
    });

    memberManageModal.present();
    // fab close
    fab ? fab.close() : true;
  }

  /**
   *  Present Member ActionSheet
   * @param  {string} key
   */
  presentMemberAction(key: string): void {
    // actionsheet define
    const actionSheet = this.actionSheetController.create({
      buttons: [
        {
          text: '친구 숨김',
          handler: async () => {
            await this.memberProvider.updateFriendType(this.authMember.uid, key, 'hide');
          }
        },
        {
          text: '친구 차단',
          handler: async () => {
            await this.memberProvider.updateFriendType(this.authMember.uid, key, 'block');
          }
        },
        {
          text: '글작성',
          handler: () => {
            this.presentMemberSelectModal();
          }
        },
        {
          text: '취소',
          role: 'cancel'
        }
      ]
    });
    // actionsheet show
    actionSheet.present();
  }

  /**
   *  Present Loading
   */
  presentLoading(): void {
    this.loader = this.loadingController.create({
      spinner: 'dots'
    });

    this.loader.present();
  }

  /**
   *  Close Loading
   */
  dismissLoading(): void {
    this.loader.dismiss();
  }

  /**
   *  Searchbar Filter event
   * @param  {any} event
   */
  onFilterEvent(event): void {
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
   * @param  {string} type
   */
  async getFriends(type: string): Promise<any> {
    this.authMember = await this.storage.get('member');
    this.memberProvider.getFriends(this.authMember.uid, type).subscribe(async (res) => {
      // type filter
      res = res.filter((item) => {return item.payload.doc.data().type === type});
      this.friendsData = await Promise.all(
        res.map(async (item, index) => {
          const member = await this.memberProvider.getMember(item.payload.doc.data().uid);
          return Object.assign({key: item.payload.doc.id}, member.data());
        })
      )
    })
    this.friendsData.sort((a, b) => { return a.name < b.name ? -1 : a.name > b.name ? 1 : 0; });
    this.friendsDataFilter = this.friendsData;
  }

}
