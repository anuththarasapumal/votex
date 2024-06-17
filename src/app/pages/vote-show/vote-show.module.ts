import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoteShowPageRoutingModule } from './vote-show-routing.module';

import { VoteShowPage } from './vote-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoteShowPageRoutingModule
  ],
  declarations: [VoteShowPage]
})
export class VoteShowPageModule {}
