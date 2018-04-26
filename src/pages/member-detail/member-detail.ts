import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-member-detail',
  templateUrl: 'member-detail.html',
})
export class MemberDetailPage {

  type: string = 'modal';
  next: any = null;
  
  profile: any = {}; // 프로필 데이터
  friend: boolean = false; // 친구 여부
  modify: boolean = false; // 수정 여부

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewController: ViewController,
  ) {
    this.profile = this.navParams.get('profile');
    this.friend = this.navParams.get('friend');
    this.modify = this.navParams.get('modify');
  }

  ionViewDidLoad() {
    
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
