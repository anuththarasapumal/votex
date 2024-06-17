import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AuthService } from '../app/services/auth.service';
import { CurdService } from '../app/services/curd.service';
// import { CommonService } from '../app/services/common.service';
// import { ToastService } from '../app/services/toast.service';
// import { provideHotToastConfig } from '@ngneat/hot-toast';
import { HttpClientModule } from '@angular/common/http';
// import { ChartsModule } from 'ng2-charts';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Platform } from '@ionic/angular';
import { ProfilePage } from './pages/profile/profile.page';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(),HttpClientModule, AppRoutingModule, ReactiveFormsModule,
    FormsModule, IonicStorageModule.forRoot() ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  
})
export class AppModule { }
