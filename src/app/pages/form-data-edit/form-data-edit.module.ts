import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormDataEditPageRoutingModule } from './form-data-edit-routing.module';
// import { LoginPage } from '../../auth/login/login.page';

import { FormDataEditPage } from './form-data-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormDataEditPageRoutingModule
  ],
  declarations: [FormDataEditPage],
  // providers:[LoginPage]

})
export class FormDataEditPageModule {}
