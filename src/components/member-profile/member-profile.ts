import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'member-profile',
  templateUrl: 'member-profile.html'
})
export class MemberProfileComponent {

  @Input() profile: any = {};
  @Input() friend: boolean;
  @Output() addFriendEvent: any = new EventEmitter<boolean>();

  constructor() { }

  /**
   *  Add Friend
   * @param  {any} profile
   */
  addFriend(profile) {
    this.addFriendEvent.emit(profile);
  }

}
