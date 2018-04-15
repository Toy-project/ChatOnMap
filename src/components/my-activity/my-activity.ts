import { Component } from '@angular/core';

/**
 * Generated class for the MyActivityComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'my-activity',
  templateUrl: 'my-activity.html'
})
export class MyActivityComponent {

  text: string;

  constructor() {
    console.log('Hello MyActivityComponent Component');
    this.text = 'Hello World';
  }

}
