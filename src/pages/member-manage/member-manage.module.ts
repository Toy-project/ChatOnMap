import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';

import { MemberManagePage } from './member-manage';

@NgModule({
  declarations: [
    MemberManagePage,
  ],
  imports: [
    IonicPageModule.forChild(MemberManagePage),
    ComponentsModule,
  ],
})
export class MemberManagePageModule {}
