import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';

import { MemberSelectPage } from './member-select';

@NgModule({
  declarations: [
    MemberSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberSelectPage),
    ComponentsModule,
  ],
})
export class MemberSelectPageModule {}
