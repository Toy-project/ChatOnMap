import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

declare var naver: any;

@IonicPage()
@Component({
  selector: 'page-write',
  templateUrl: 'write.html',
})
export class WritePage {

  type: string = 'modal';
  next: any = null;
  
  writeMember: any;
  writeLocation: any;
  writeTag: any;
  writeForm: FormGroup;
  writeContent: AbstractControl;
  writePhoto: AbstractControl;

  constructor(
    public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewController: ViewController,
    public formBuilder: FormBuilder
  ) {
    
  }

  ionViewDidLoad() {
    this.createWriteForm();
    this.createMap();
  }

  createWriteForm(): void {
    this.writeMember = this.navParams.get('writeMember');
    this.writeLocation = this.navParams.get('writeLocation');
    this.writeTag = this.navParams.get('writeTag');
    this.writeForm = this.formBuilder.group({
      tag: [this.writeTag, Validators.compose([])],
      content: ['', Validators.compose([Validators.required])],
      photo: ['', Validators.compose([])],
      createdAt: ['', Validators.compose([])],
      lastUpdatedAt: ['', Validators.compose([])],
      checkIn: [false, Validators.compose([])],
      uid: [this.writeMember.uid, Validators.compose([])],
      lat: [this.writeLocation.lat, Validators.compose([])],
      lng: [this.writeLocation.lng, Validators.compose([])]
    });
    this.writeTag = this.writeForm.controls['writeTag'];
    this.writeContent = this.writeForm.controls['writeContent'];
  }

  // create map
  createMap(): void {
    // map setting
    let map = new naver.maps.Map('map-write', {
      center: new naver.maps.LatLng(this.writeLocation.lat, this.writeLocation.lng),
      zoom: 10,
    });

    let marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(this.writeLocation.lat, this.writeLocation.lng),
      map: map,
      icon: {
        content: [
          '<div class="marker"></div>'
        ].join(''),
      }
    });

    naver.maps.Event.addListener(map, 'bounds_changed', (bounds) => {
      // get center
      const center = map.getCenter();
      // location
      this.writeLocation.lat = center.y;
      this.writeLocation.lng = center.x;
      // set position
      marker.setPosition(center);
    });
  }


  /**
   *  Close Modal
   */
  dismiss() {
    this.viewController.dismiss();
  }

}
