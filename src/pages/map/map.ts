import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';

declare var naver: any;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  authMember: any;
  location: any = {};

  constructor(
    public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalController: ModalController,
    public actionSheetController: ActionSheetController,
  ) { }

  ionViewDidLoad() {
    this.presentMap();
  }

  presentWriteModal(): void {
    let writeModal = this.modalController.create('WritePage', {
      writeMember: this.authMember,
      writeLocation: this.location,
      writeTag: null,
    });

    writeModal.present();
  }

  // present write action sheet
  presentWriteAction(): void {
    // actionsheet define
    const actionSheet = this.actionSheetController.create({
      buttons: [
        {
          text: '현재 위치에 글 작성',
          handler: () => {
            this.presentWriteModal();
          }
        },
        {
          text: '장소 검색',
          handler: () => {
            
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

  async presentMap(): Promise<any> {
    await this.getLocation();
    this.createMap();
  }

  async getLocation(): Promise<any> {
    // get auth member
    this.authMember = await this.storage.get('member');
    // 추후 GPS로 변경
    this.location = {
      lat: 37.5666805,
      lng: 126.9784147 
    }
  }

  // create map event
  createMap(): void {
    // map setting
    let map = new naver.maps.Map('map', {
      zoom: 10,
      center: new naver.maps.LatLng(this.location.lat, this.location.lng),
      zoomControl:true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL
      }
    });

    let marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(this.location.lat, this.location.lng),
      map: map,
      icon: {
        content: [
          '<div class="marker"></div>'
        ].join(''),
      }
    });

    naver.maps.Event.addListener(marker, 'click', (event) => {
      this.presentWriteAction();
    });
  }

}
