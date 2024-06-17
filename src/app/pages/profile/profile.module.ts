import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { LoginPage } from '../../auth/login/login.page';
import { ChangePasswordPage } from '../../auth/change-password/change-password.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule
  ],
  declarations: [ProfilePage],
  providers:[LoginPage,ChangePasswordPage]
})
export class ProfilePageModule {}
