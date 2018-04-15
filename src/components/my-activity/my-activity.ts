import { Component } from '@angular/core';

@Component({
  selector: 'my-activity',
  templateUrl: 'my-activity.html'
})
export class MyActivityComponent {

  // set activity data
  public activityData: Array<any> = [
    {
      type: 'write',
      date: 1523628561568,
      place: '홍대',
    },
    {
      type: 'friend',
      date: 1523628561568,
      name: '나야나',
      uid: ''
    },
    {
      type: 'share',
      date: 1523628561568,
      name: '나야나',
      uid: ''
    },
    {
      type: 'info',
      date: 1523628561568,
      message: 'password'
    },
    {
      type: 'info',
      date: 1523628561568,
      message: 'photo'
    },
    {
      type: 'info',
      date: 1523628561568,
      message: 'profile'
    }
  ];

  constructor() { }

}
