import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoteShowPage } from './vote-show.page';

const routes: Routes = [
  {
    path: '',
    component: VoteShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoteShowPageRoutingModule {}
