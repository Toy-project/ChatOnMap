import { Component } from '@angular/core';

/**
 * Generated class for the MyProfileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'my-profile',
  templateUrl: 'my-profile.html'
})
export class MyProfileComponent {

  text: string;

  constructor() {
    console.log('Hello MyProfileComponent Component');
    this.text = 'Hello World';
  }

}
