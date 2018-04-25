import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-member-detail',
  templateUrl: 'member-detail.html',
})
export class MemberDetailPage {

  type: string = 'modal';
  next: any = {};
  
  profile: any = {};
  friend: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewController: ViewController,
  ) {
    this.profile = this.navParams.get('profile');
    this.friend = this.navParams.get('friend');
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
