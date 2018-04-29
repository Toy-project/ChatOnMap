import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ActionSheetController } from 'ionic-angular';

import { MemberProvider } from '../../providers/member/member';

@IonicPage()
@Component({
  selector: 'page-member-manage',
  templateUrl: 'member-manage.html',
})
export class MemberManagePage {
  
  type: string = 'modal';
  next: any = null;
  segment: string = 'hide';
  loader: any;

  authMember: any = {};
  friendsData: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewController: ViewController,
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    public memberProvider: MemberProvider
  ) {
    this.authMember = this.navParams.get('authMember');
  }

  ionViewDidLoad() {
    this.getFriends('hide');
    this.getFriends('block');
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
   *  Present Member ActionSheet If Hide
   * @param  {string} key
   */
  presentMemberActionIfHide(key: string): void {
    // actionsheet define
    const actionSheet = this.actionSheetController.create({
      buttons: [
        {
          text: '친구 목록으로 복귀',
          handler: async () => {
            await this.memberProvider.updateFriendType(this.authMember.uid, key, 'common');
            this.getFriends('hide');
          }
        },
        {
          text: '차단으로 변경',
          handler: async () => {
            await this.memberProvider.updateFriendType(this.authMember.uid, key, 'block');
            this.getFriends('hide');
            this.getFriends('block');
          }
        },
        {
          text: '친구 삭제',
          handler: () => {
            this.deleteFriend(this.authMember.uid, key);
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
   *  Present Member ActionSheet If Block
   * @param  {string} key
   */
  presentMemberActionIfBlock(key: string): void {
    // actionsheet define
    const actionSheet = this.actionSheetController.create({
      buttons: [
        {
          text: '친구 목록으로 복귀',
          handler: async () => {
            await this.memberProvider.updateFriendType(this.authMember.uid, key, 'common');
            this.getFriends('block');
          }
        },
        {
          text: '숨김으로 변경',
          handler: async () => {
            await this.memberProvider.updateFriendType(this.authMember.uid, key, 'hide');
            this.getFriends('hide');
            this.getFriends('block');
          }
        },
        {
          text: '친구 삭제',
          handler: () => {
            this.deleteFriend(this.authMember.uid, key);
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
   *  Get Friend
   * @param  {string} type
   */
  async getFriends(type: string): Promise<any> {
    this.friendsData[`${type}`] = await this.memberProvider.getFriends(this.authMember.uid, type);
  }

  /**
   *  Delete Member By Id
   * @param  {string} uid
   * @param  {string} key
   */
  async deleteFriend(uid: string, key: string): Promise<any> {
    // loading start
    this.presentLoading();
    // delete friend
    await this.memberProvider.deleteFriend(uid, key);
    // loading start
    this.dismissLoading();
  }

  /**
   *  Close Modal
   */
  dismiss(): void {
    this.viewController.dismiss();
  }

}
