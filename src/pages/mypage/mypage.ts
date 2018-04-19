import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-mypage',
  templateUrl: 'mypage.html',
})
export class MypagePage {

  // set friends data
  public friendsData: Array<any> = [
    {
      name: '나야나',
      photo: 'https://cdn.pixabay.com/photo/2017/11/09/16/29/portraits-2934006_1280.jpg'
    },
    {
      name: '나야나',
      photo: 'https://cdn.pixabay.com/photo/2017/11/09/16/29/portraits-2934006_1280.jpg'
    },
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) { }

  ionViewDidLoad() {

  }

}
