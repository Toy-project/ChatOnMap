import { Component } from '@angular/core';

import { NavData } from '../../../shared/nav/nav-data';

/**
 * Generated class for the LayFooterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'lay-footer',
  templateUrl: 'lay-footer.html'
})
export class LayFooterComponent {

  public navData: Array<any> = NavData;

  constructor() { }

}
