import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormDataEditPage } from './form-data-edit.page';

const routes: Routes = [
  {
    path: '',
    component: FormDataEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormDataEditPageRoutingModule {}
