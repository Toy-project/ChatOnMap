import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-member-search',
  templateUrl: 'member-search.html',
})
export class MemberSearchPage {

  type: string = 'modal';
  next: any = {};
  data: any = {};
  friend: boolean = false; 

  searchForm: FormGroup;
  searchText: AbstractControl;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewController: ViewController,
    public formBuilder: FormBuilder
  ) {
    this.createSearchForm();
  }

  ionViewDidLoad() {

  }

  createSearchForm() {
    this.searchForm = this.formBuilder.group({
      searchText: ['', Validators.compose([Validators.required])],
    });
    this.searchText = this.searchForm.controls['searchText'];
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
