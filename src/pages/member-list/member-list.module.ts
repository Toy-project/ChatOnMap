import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';

import { MemberListPage } from './member-list';

@NgModule({
  declarations: [
    MemberListPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberListPage),
    ComponentsModule,
  ],
})
export class MemberListPageModule {}
