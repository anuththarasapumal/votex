import { Component, OnInit } from '@angular/core';
import { LoadingController, NavParams, ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { CurdService } from 'src/app/services/curd.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { ProfilePage } from 'src/app/pages/profile/profile.page';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  current_password!: number | null;
  new_password!: number | null;
  confirm_password!: number | null;
  current_password_incorrect = false;
  confirm_password_incorrect = false;

  id = ''


  all_user_data = { user_name: '', superuser_id: '', user_id: '', gnd_id: '', poli_party_id: '', token:''}

  constructor(
    // private navParams: NavParams,
    private modalController: ModalController,
    private curdService: CurdService,
    private toastController: ToastController,
    private storage: Storage,
    private router: Router,
    public loadingController: LoadingController,
    // private ProfilePage: ProfilePage,

  ) { }

  ngOnInit() {
    this.storage.create();
    this.loadStorageData();
  }


  async loadStorageData() {
    this.all_user_data = await this.storage.get('loged_user_data');
    console.log('User data saved:', this.all_user_data);
  }

  back() {
    this.router.navigate(['profile']);
    this.modalController.dismiss();
  }

  // get input values
  onInput(event: any, _value: any) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value.length > 4) {
      inputElement.value = inputElement.value.slice(0, 4);
    }
    if (_value == 'current_password') {
      this.current_password = event.target.value;
    }
    if (_value == 'new_password') {
      this.new_password = event.target.value;
    }
    if (_value == 'confirm_password') {
      this.confirm_password = event.target.value;
    }
    if (this.new_password && this.confirm_password) {
      if (this.new_password != this.confirm_password) {
        this.confirm_password_incorrect = true
      }else{
        this.confirm_password_incorrect = false
      }
    }

  }

  async saveData() {
    const loading = await this.loadingController.create({
      spinner: 'circles',
      message: 'Updating...',
      cssClass: 'custom-loading',
    });
    await loading.present();
    if(this.confirm_password_incorrect == false){

    let input_data = {
      old_password: this.current_password,
      new_password: this.new_password,
      confirm_new_password: this.confirm_password,

    };
    this.curdService.changePassword(input_data,this.all_user_data.token).subscribe(async response => {
      console.log('Response:', response);
      this.loadingController.dismiss();
      this.modalController.dismiss();
      this.router.navigate(['login']);
      await this.storage.remove('loged_user_data');
      const toast = await this.toastController.create({
        message: 'Saved Successfully',
        duration: 1500,
        position: 'top',
        color: 'success'
      });
      await toast.present();
      console.log('Response:', response);
    }, async error => {
      this.loadingController.dismiss();
      console.error('Error:', error.error.error);
      const toast = await this.toastController.create({
        message: error.error.error,
        duration: 1500,
        position: 'top',
        color: 'danger'
      });
      await toast.present();
      // Handle error here
    });
  }else{
    this.loadingController.dismiss();
    this.modalController.dismiss();
    const toast = await this.toastController.create({
      message: 'Incorrect confirm password',
      duration: 1500,
      position: 'top',
      color: 'danger'
    });
    await toast.present();
  }

  }

}
