import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { LayHeaderComponent } from './lay-header/lay-header';

@NgModule({
	declarations: [
		LayHeaderComponent,
	],
	imports: [
		IonicModule
	],
	exports: [
		LayHeaderComponent,
	]
})
export class ComponentsModule {}
