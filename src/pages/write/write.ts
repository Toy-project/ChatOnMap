import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-write',
  templateUrl: 'write.html',
})
export class WritePage {

  authMember: any = {};
  type: string = 'modal';
  next: any = null;

  writeForm: FormGroup;
  writeTag: AbstractControl;
  writeContent: AbstractControl;
  writePhoto: AbstractControl;

  constructor(
    public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewController: ViewController,
    public formBuilder: FormBuilder
  ) {
    this.createWriteForm();
  }

  ionViewDidLoad() {
  }

  createWriteForm() {
    this.writeForm = this.formBuilder.group({
      tag: ['', Validators.compose([])],
      content: ['', Validators.compose([Validators.required])],
      photo: ['', Validators.compose([])],
      createdAt: ['', Validators.compose([])],
      lastUpdatedAt: ['', Validators.compose([])],
      checkIn: [false, Validators.compose([])],
      uid: ['', Validators.compose([])],
      lat: ['', Validators.compose([])],
      lan: ['', Validators.compose([])]
    });
    this.writeTag = this.writeForm.controls['writeTag'];
    this.writeContent = this.writeForm.controls['writeContent'];
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
