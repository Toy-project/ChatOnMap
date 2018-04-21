import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';

import { FindPasswordPage } from './find-password';

@NgModule({
  declarations: [
    FindPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(FindPasswordPage),
    ComponentsModule,
  ],
})
export class FindPasswordPageModule {}
