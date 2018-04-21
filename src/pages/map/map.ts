import { Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('googleMap') mapElement: ElementRef;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) { }

  ionViewDidLoad() {
    this.createMap();
  }

  // create map event
  public createMap(): void {
    // map element
    const mapEle = this.mapElement.nativeElement;

    // map options 
    const mapOption = {
      center: {
        lat: 37.4980909,
        lng: 127.0265186
      },
      zoom: 16,
      mapTypeId: 'roadmap',
      streetViewControl: false,
      rotateControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      scaleControl: true
    }

    // set google map
    new google.maps.Map(mapEle, mapOption);
  }

}
