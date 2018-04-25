import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';

import { MemberSearchPage } from './member-search';

@NgModule({
  declarations: [
    MemberSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberSearchPage),
    ComponentsModule,
  ],
})
export class MemberSearchPageModule {}
