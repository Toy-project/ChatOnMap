import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { MemberProvider } from '../../providers/member/member';

@IonicPage()
@Component({
  selector: 'page-member-search',
  templateUrl: 'member-search.html',
})
export class MemberSearchPage {

  type: string = 'modal';
  next: any = null;

  profile: any = {};
  friend: boolean;

  searchForm: FormGroup;
  searchText: AbstractControl;
  searchLoader: any;
  searchLoading: boolean = false;

  constructor(
    public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewController: ViewController,
    public loadingController: LoadingController,
    public formBuilder: FormBuilder,
    public memberProvider: MemberProvider
  ) {
    this.createSearchForm();
  }

  ionViewDidLoad() {

  }

  createSearchForm(): void {
    this.searchForm = this.formBuilder.group({
      searchText: ['', Validators.compose([Validators.required])],
    });
    this.searchText = this.searchForm.controls['searchText'];
  }

  presentLoading(): void {
    this.searchLoader = this.loadingController.create({
      spinner: 'dots'
    });

    this.searchLoader.present();
  }

  dismissLoading(): void {
    this.searchLoader.dismiss();
  }

  /**
   *  Search Member By Id
   * @param  {any} value
   */
  async searchMember(value: any): Promise<any> {
    if (this.searchForm.valid) {
      this.searchLoading = false;
      // loading start
      this.presentLoading();
      // Get 회원 데이터
      this.profile = await this.memberProvider.searchMemberById(value.searchText);
      if (this.profile) {
        // 회원이 있는 경우
        const authMember = await this.storage.get('member');
        this.friend = authMember.uid !== this.profile.uid ? await this.memberProvider.existsFriend(authMember.uid, this.profile.uid) : true;
        // loading end
        this.dismissLoading();
        this.searchLoading = true;
      } else {
        // 회원이 없는 경우
        // loading end
        this.dismissLoading();
        this.searchLoading = true;
      }
    } else {
      // todo
    }
  }

  /**
   *  Close Modal
   * @param  {any} value
   */
  async addFriendEvent(value): Promise<any> {
    const authMember = await this.storage.get('member');
    await this.memberProvider.addFriend(authMember.uid, value.uid);
    this.dismiss(true);
  }

  /**
   *  Close Modal
   * @param  {boolean} bool
   */
  dismiss(bool: boolean): void {
    if (bool) {
      this.viewController.dismiss();
    } else {
      // todo
    }
  }

}
