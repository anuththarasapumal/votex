import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage-angular';
import { number } from '@amcharts/amcharts4/core';
import { CurdService } from 'src/app/services/curd.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  pin!: number | null;
  login_credentials: any;
  password_have = false;
  phone_number: string = '';
  phone_number_incorrect = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private toastController: ToastController,
    private storage: Storage,
    public loadingController: LoadingController,
    private curdService: CurdService,

  ) { }


  ngOnInit() {
    this.storage.create();
    this.getLoginCredentials();
  }

  // load storage data
  async getLoginCredentials() {
    this.login_credentials = await this.storage.get('loged_user_data');
    if (this.login_credentials) {
      if (this.login_credentials.pin) {
        this.phone_number = this.login_credentials.user_name
        this.password_have = true
      }
    }
  }

  // get input values
  onInput(event: any, _value: any) {
    if (_value == 'phone_number') {
      this.phone_number = event.target.value;
      if (this.phone_number.length != 10) {
        this.phone_number_incorrect = true;
      }
      if (this.phone_number.length == 10) {
        this.phone_number_incorrect = false;
      }
    }
    if (_value == 'pin') {
      this.pin = event.target.value;
      const inputElement = event.target as HTMLInputElement;
      if (inputElement.value.length > 4) {
        inputElement.value = inputElement.value.slice(0, 4);
      }
    }
  }

  // login
  async login() {
    if (this.password_have == true) {
      this.phone_number = this.phone_number
    }
    const data = {
      phone1: this.phone_number,
      password: this.pin,
    };
    if (this.phone_number && this.pin) {
      const loading = await this.loadingController.create({
        spinner: 'circles',
        message: 'Please wait..',
        cssClass: 'custom-loading',
      });
      await loading.present();
      this.auth.login(data).subscribe(async response => {
        response.pin = this.pin
        this.setToStorage(response)
       
      }, async error => {
        this.loadingController.dismiss();
        console.error('Error:', error.error.non_field_errors);
        if (error.error.non_field_errors[0] == 'Unable to authenticate with the provided credentials.') {
          const toast = await this.toastController.create({
            message: 'Invalid user name or password',
            duration: 1500,
            position: 'top',
            color: 'danger',
          });
          await toast.present();
        } else {
          this.loadingController.dismiss();
          const toast = await this.toastController.create({
            message: 'Something went wrong',
            duration: 1500,
            position: 'top',
            color: 'danger',
          });
          await toast.present();
        }
        // Handle error here
      });
    } else {
      this.loadingController.dismiss();
      const toast = await this.toastController.create({
        message: 'Please enter your user name and password',
        duration: 1500,
        position: 'top',
        color: 'danger',
      });
      await toast.present();
    }
  }

  // set storage values
  async setToStorage(data: any) {
    console.log(data)
      this.curdService.getUserData(data.user_id).subscribe(async response => {
        console.log(response)
        data.first_name = response[0].first_name;
        data.last_name = response[0].last_name;
        data.phone1 = response[0].phone1;
        this.curdService.getGndData(data.gnd_id).subscribe(gnd_response => {
          data.dsd = gnd_response[0].dsd;
          data.gnd = gnd_response[0].gnd;
          this.curdService.getMPData(data.superuser_id).subscribe(async response => {
            data.super_user_first_name = response[0].first_name;
            data.super_user_last_name = response[0].last_name;
            await this.storage.set('loged_user_data', data).then(async res=>{
              if (data.is_superuser == false && data.is_active == true) {
                console.log(data)
                this.router.navigate(['data-summery']);
                this.loadingController.dismiss();
                this.pin = null;
              } else {
                this.loadingController.dismiss();
                const toast = await this.toastController.create({
                  message: 'Invalid login details',
                  duration: 1500,
                  position: 'top',
                  color: 'danger',
                });
      
                await toast.present();
              }
            });
            console.log(this.storage.get('loged_user_data'))
          }, error => {
            console.error('Error:', error);
          });
        }, error => {
          console.error('Error:', error);
        });
       
      }, error => {
        console.error('Error:', error);
        // Handle error here
      });

  }

  logOut(phone_number:any){
    this.pin = null;
    this.phone_number = phone_number
    console.log( this.pin ,phone_number)
  }
}



