import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangePasswordPageRoutingModule } from './change-password-routing.module';

import { ChangePasswordPage } from './change-password.page';
import { ProfilePage } from './../../pages/profile/profile.page';
import { LoginPage } from './../login/login.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangePasswordPageRoutingModule
  ],
  declarations: [ChangePasswordPage],
  providers:[ProfilePage,LoginPage]

})
export class ChangePasswordPageModule {}
