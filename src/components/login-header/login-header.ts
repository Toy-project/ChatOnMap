import { Component } from '@angular/core';

/**
 * Generated class for the LoginHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'login-header',
  templateUrl: 'login-header.html'
})
export class LoginHeaderComponent {

  text: string;

  constructor() {
    console.log('Hello LoginHeaderComponent Component');
    // this.text = 'CHATONMAP';
  }

}
