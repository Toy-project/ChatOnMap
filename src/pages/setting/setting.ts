import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  // default setting
  public setting: Object = {
    keepLogin: true,
    pushAlarm: false,
    pushAlarmClock: '09:00'
  }

  // custom datepicker
  public datePicker: Object = {
    doneText: '확인',
    cancelText: '취소',
    hourValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    minuteValues: [0, 15, 30, 45],
    displayFormat: 'hh:mm A',
    pickerFormat: 'hh:mm A'
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) { }

  ionViewDidLoad() {
    
  }

  // setting change event
  public settingChagne(value) {
    console.log(value);
  }

}
