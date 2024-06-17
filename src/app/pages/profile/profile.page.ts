import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoginPage } from '../../auth/login/login.page';
import { ActivatedRoute, Router } from '@angular/router';
import { CurdService } from 'src/app/services/curd.service';
import { Storage } from '@ionic/storage-angular';
import { LoadingController, ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ChangePasswordPage } from 'src/app/auth/change-password/change-password.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user_data = {
    first_name: '',
    last_name: '',
    phone1: ''
  };

  gnd_data = {
    gnd: '',
    dsd: ''
  };

  super_user_info = {
    first_name: '',
    last_name: ''
  }

  all_user_data = { user_name: '', superuser_id: '', user_id: '', gnd_id: '', poli_party_id: '',super_user_first_name:'',
    super_user_last_name:'',first_name:'',last_name:'',dsd:'',gnd:'',phone1:''
    
  }

  constructor(
    private curdService: CurdService,
    private loginPage: LoginPage,
    private router: Router,
    private storage: Storage,
    public loadingController: LoadingController,
    private modalController: ModalController,

  ) { }


  ngOnInit() {
    this.storage.create();
    this.loadStorageData();
  }

  // Change password
  async changePassword() {
    const modal = await this.modalController.create({
      component: ChangePasswordPage,
      componentProps: {
        data: this.all_user_data // Pass your data here
      }
    });
    await modal.present();
  }


  // load local storage data
  async loadStorageData() {
    this.all_user_data = await this.storage.get('loged_user_data');
    console.log( this.all_user_data)
  }


  // logout
  async logOut() {
    this.router.navigate(['login']);
    await this.storage.remove('loged_user_data');
    this.remove()
    this.loginPage.logOut(this.all_user_data.user_name)
  }

  // remove store data
  public async remove() {
    let store_value = await this.storage.remove('loged_user_data');
  }
  // page links
  addData() {
    this.router.navigate(['data-form']);
  }

  showSmmery() {
    this.router.navigate(['data-summery']);
  }

  dataList() {
    this.router.navigate(['data-list']);
  }

  goToProfile() {
    this.router.navigate(['profile']);
  }

}


