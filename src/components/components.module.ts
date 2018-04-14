import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { LayHeaderComponent } from './lay-header/lay-header';
import { MyFriendsComponent } from './my-friends/my-friends';
import { MyActivityComponent } from './my-activity/my-activity';
import { MyProfileComponent } from './my-profile/my-profile';

@NgModule({
	declarations: [
		LayHeaderComponent,
		MyFriendsComponent,
		MyActivityComponent,
		MyProfileComponent
	],
	imports: [
		IonicModule
	],
	exports: [
		LayHeaderComponent,
		MyFriendsComponent,
		MyActivityComponent,
		MyProfileComponent
	]
})
export class ComponentsModule {}
