import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';

@Component({
  selector: 'member-profile',
  templateUrl: 'member-profile.html'
})
export class MemberProfileComponent {

  @Input() profile: any = {};
  @Input() friend: boolean = false;
  @Input() modify: boolean = false;
  @Output() addFriendEvent: any = new EventEmitter<boolean>();

  constructor(
    public actionSheetController: ActionSheetController,
    public camera: Camera,
    public imagePicker: ImagePicker
  ) { }


  // present adction sheet event
  presentActionSheet(): void {
    // actionsheet define
    const actionSheet = this.actionSheetController.create({
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
  async openGallery(): Promise<any> {
    // gallery image options
    const options = {
      maximumImagesCount: 1,
      width: 500,
      height: 500,
      quality: 100
    };

    try {
      // get gallery image
      const results = await this.imagePicker.getPictures(options);
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
      }
    } catch(err) {
      console.log(err);
    }
  }

  // open camera event
  async openCamera(): Promise<any> {
    // camera image options
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    try {
      const imageData = await this.camera.getPicture(options);
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(base64Image);
    } catch(err) {
      console.log(err);
    }
  }

  /**
   *  Add Friend
   * @param  {any} profile
   */
  addFriend(profile) {
    this.addFriendEvent.emit(profile);
  }

}
