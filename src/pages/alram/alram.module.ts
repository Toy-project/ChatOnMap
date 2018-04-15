import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlramPage } from './alram';

@NgModule({
  declarations: [
    AlramPage,
  ],
  imports: [
    IonicPageModule.forChild(AlramPage),
  ],
})
export class AlramPageModule {}
