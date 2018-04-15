import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';

@IonicPage()
@Component({
  selector: 'page-mypage',
  templateUrl: 'mypage.html',
})
export class MypagePage {

  // default mypage segment
  public mypageSegment: string = 'friends';

  // default user info
  public user: Object = {
    name: '홍길동',
    createdAt: 1523628561568,
    photo: 'https://cdn.pixabay.com/photo/2017/11/09/16/29/portraits-2934006_1280.jpg'
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public camera: Camera,
    public imagePicker: ImagePicker
  ) { }

  ionViewDidLoad() {

  }

  // present adction sheet event
  public presentActionSheet(): void {
    // actionsheet define
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '앨범에서 사진 선택',
          handler: () => {
            // open gallery
            this.openGallery();
          }
        },
        {
          text: '사진 찍기',
          handler: () => {
            // open camera
            this.openCamera();
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

  // open gallery event
  public openGallery(): void {
    // gallery image options
    const options = {
      maximumImagesCount: 1,
      width: 500,
      height: 500,
      quality: 100
    };

    // get gallery image
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
      }
    }, (err) => {
      // Handle error
    });
  }

  // open camera event
  public openCamera(): void {
    // camera image options
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    // get camera image
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(base64Image);
    }, (err) => {
      // Handle error
    });
  }

}
