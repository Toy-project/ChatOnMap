import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { LayHeaderComponent } from './lay-header/lay-header';
import { MyFriendsComponent } from './my-friends/my-friends';
import { MyActivityComponent } from './my-activity/my-activity';
import { MyProfileComponent } from './my-profile/my-profile';
import { LoginHeaderComponent } from './login-header/login-header';

@NgModule({
	declarations: [
		LayHeaderComponent,
		MyFriendsComponent,
		MyActivityComponent,
		MyProfileComponent,
    LoginHeaderComponent
	],
	imports: [
		IonicModule
	],
	exports: [
		LayHeaderComponent,
		MyFriendsComponent,
		MyActivityComponent,
		MyProfileComponent,
    LoginHeaderComponent
	]
})
export class ComponentsModule {}
