import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { LayHeaderComponent } from './lay-header/lay-header';
import { LoginHeaderComponent } from './login-header/login-header';
import { MemberProfileComponent } from './member-profile/member-profile';

@NgModule({
	declarations: [
		LayHeaderComponent,
		LoginHeaderComponent,
    MemberProfileComponent,
	],
	imports: [
		IonicModule
	],
	exports: [
		LayHeaderComponent,
		LoginHeaderComponent,
    MemberProfileComponent,
	]
})
export class ComponentsModule {}
