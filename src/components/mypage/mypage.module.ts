import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { MyFriendsComponent } from './my-friends/my-friends';
import { MyActivityComponent } from './my-activity/my-activity';
import { MyProfileComponent } from './my-profile/my-profile';

@NgModule({
	declarations: [
    MyFriendsComponent,
    MyActivityComponent,
    MyProfileComponent
  ],
	imports: [
    IonicModule
  ],
	exports: [
    MyFriendsComponent,
    MyActivityComponent,
    MyProfileComponent
  ]
})
export class MypageModule {}
