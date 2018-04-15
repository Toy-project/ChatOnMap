import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//page

import {AlramPage} from '../../pages/alram/alram';

@Component({
  selector: 'lay-header',
  templateUrl: 'lay-header.html'
})
export class LayHeaderComponent {

  public alarmCount: number = 0;

  constructor(public nav: NavController) { }

  gotoAlram(){
    this.nav.push(AlramPage);
  }
}
