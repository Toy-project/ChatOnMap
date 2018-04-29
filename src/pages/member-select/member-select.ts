import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { MemberProvider } from '../../providers/member/member';

@IonicPage()
@Component({
  selector: 'page-member-select',
  templateUrl: 'member-select.html',
})
export class MemberSelectPage {

  type: string = 'modal';
  next: any = {
    page: 'WritePage',
    icon: 'checkmark',
  };

  friendsData: Array<any> = [];
  friendsDataFilter: Array<any> = [];

  constructor(
    public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewController: ViewController,
    public memberProvider: MemberProvider,
  ) {
    this.friendsData = this.navParams.get('friends');
    this.friendsDataFilter = this.friendsData;
  }

  ionViewDidLoad() {
    
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
   *  Close Modal
   */
  dismiss() {
    this.viewController.dismiss();
  }

}
