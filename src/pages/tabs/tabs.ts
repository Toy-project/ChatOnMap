import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TabsData } from '../../shared/tabs/tabs-data';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  // set tab data
  public tabsData: Array<any> = TabsData.filter((tab) => {return tab.show ? tab : null});
  public selectedIndex: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.selectedIndex = navParams.data.tabIndex || 0;
  }

  ionViewDidLoad() {

  }

}
