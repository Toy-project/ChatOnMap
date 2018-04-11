import { Component } from '@angular/core';

/**
 * Generated class for the MyFriendsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'my-friends',
  templateUrl: 'my-friends.html'
})
export class MyFriendsComponent {

  text: string;

  constructor() {
    console.log('Hello MyFriendsComponent Component');
    this.text = 'Hello World';
  }

}
