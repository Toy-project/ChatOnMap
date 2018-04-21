import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { LayHeaderComponent } from './lay-header/lay-header';
import { LoginHeaderComponent } from './login-header/login-header';

@NgModule({
	declarations: [
		LayHeaderComponent,
		LoginHeaderComponent,
	],
	imports: [
		IonicModule
	],
	exports: [
		LayHeaderComponent,
		LoginHeaderComponent,
	]
})
export class ComponentsModule {}
