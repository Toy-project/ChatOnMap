import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';

import { WritePage } from './write';

@NgModule({
  declarations: [
    WritePage,
  ],
  imports: [
    IonicPageModule.forChild(WritePage),
    ComponentsModule,
    
  ],
})
export class WritePageModule {}
