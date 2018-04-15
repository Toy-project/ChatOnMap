import { Component } from '@angular/core';

@Component({
  selector: 'my-friends',
  templateUrl: 'my-friends.html'
})
export class MyFriendsComponent {

  // set friends data
  public friendsData: Array<any> = [
    {
      name: '나야나',
      photo: 'https://cdn.pixabay.com/photo/2017/11/09/16/29/portraits-2934006_1280.jpg'
    },
    {
      name: '나야나',
      photo: 'https://cdn.pixabay.com/photo/2017/11/09/16/29/portraits-2934006_1280.jpg'
    },
  ];

  constructor(
  
  ) { }

}
