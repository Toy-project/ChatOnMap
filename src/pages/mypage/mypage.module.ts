import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';

import { MypagePage } from './mypage';

@NgModule({
  declarations: [
    MypagePage,
  ],
  imports: [
    IonicPageModule.forChild(MypagePage),
    ComponentsModule,
  ],
})
export class MypagePageModule {}
