import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { LayHeaderComponent } from './lay-header/lay-header';
import { LayFooterComponent } from './lay-footer/lay-footer';

@NgModule({
	declarations: [
		LayHeaderComponent,
    LayFooterComponent
	],
	imports: [
		IonicModule
	],
	exports: [
		LayHeaderComponent,
    LayFooterComponent
	]
})
export class ComponentsModule {}
