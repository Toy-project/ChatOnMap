import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LayoutModule } from '../../components/layout/layout.module';
import { MypageModule } from '../../components/mypage/mypage.module';

import { MypagePage } from './mypage';

@NgModule({
  declarations: [
    MypagePage,
  ],
  imports: [
    IonicPageModule.forChild(MypagePage),
    LayoutModule,
    MypageModule
  ],
})
export class MypagePageModule {}
