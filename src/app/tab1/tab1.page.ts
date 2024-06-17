import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { CurdService } from 'src/app/services/curd.service';
import { Storage } from '@ionic/storage-angular';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {


  client_name = '';
  pmt_vote = 0;
  flt_vote = 0;
  phone1: string = '';
  address = '';
  nic = ''
  party_id='';
  local='';

  poliparty_list: any = [];
  all_user_data = { dsd: '', gnd: '', first_name: '', user_name: '', superuser_id: '', user_id: '', gnd_id: '', poli_party_id: '', }

  phone_number_incorrect = false;
  nic_incorrect = false;

  constructor(
    private curdService: CurdService,
    private router: Router,
    private storage: Storage,
    private toastController: ToastController,
    public loadingController: LoadingController,
  ) { }



  ngOnInit() {
    this.storage.create();
    this.loadStorageData();
    this.getPolipartyData();
  }

  // get poliparty data

  getPolipartyData() {
    this.curdService.getPoliparty().subscribe(poliparty_res => {
      this.poliparty_list = poliparty_res;
      console.log(this.poliparty_list)
    }, error => {
      console.error('Error:', error);
    });
  }

  // get storage data
  
  async loadStorageData() {
    this.all_user_data = await this.storage.get('loged_user_data');
  }


  // get input values
  onInput(event: any, _value: any) {
    if (_value == 'phone_number') {
      this.phone1 = event.target.value;
      if (this.phone1.length != 10) {
        this.phone_number_incorrect = true;
      }
      if (this.phone1.length == 10) {
        this.phone_number_incorrect = false;
        const inputElement = event.target as HTMLInputElement;
        if (inputElement.value.length > 10) {
          inputElement.value = inputElement.value.slice(0, 10);
        }
      }
    }
    if (_value == 'nic') {
      this.nic = event.target.value;
      if (this.phone1.length != 12) {
        this.nic_incorrect = true;
      }
      if (this.phone1.length == 10) {
        this.nic_incorrect = false;
        const inputElement = event.target as HTMLInputElement;
        if (inputElement.value.length > 12) {
          inputElement.value = inputElement.value.slice(0, 10);
        }
      }
    }
  }

  
  // save form data
  async saveData() {
    const loading = await this.loadingController.create({
      spinner: 'circles',
      message: 'Saving...',
      cssClass: 'custom-loading',
    });
    await loading.present();
    let validations = true
    if (this.client_name == '' || this.phone1 == '') {
      this.loadingController.dismiss();
      validations = false
      const toast = await this.toastController.create({
        message: 'Please fill out all the required fields',
        duration: 1500,
        position: 'top',
        color: 'danger',
      });
      await toast.present();
    }
    if (this.pmt_vote == 0 && this.flt_vote == 0 && validations == true) {
      this.loadingController.dismiss();
      validations = false
      const toast = await this.toastController.create({
        message: 'You must fill permanent vote or floating vote',
        duration: 1500,
        position: 'top',
        color: 'danger',
      });
      await toast.present();
    }
    if (this.phone1.length != 10 && validations == true) {
      this.loadingController.dismiss();
      validations = false
      const toast = await this.toastController.create({
        message: 'Please Enter Valid Phone Number',
        duration: 1500,
        position: 'top',
        color: 'danger',
      });
      await toast.present();
    }
    if (validations == true) {
      let input_data = {
    
        user_name: this.all_user_data.user_name,
        client_name: this.client_name,
        phone1: this.phone1,
        pmt_vote: this.pmt_vote,
        flt_vote: this.flt_vote,
        superuser_id: this.all_user_data.superuser_id,
        gnd_id: this.all_user_data.gnd_id,
        address: this.address,
        nic: this.nic,
        party_id:this.party_id,
        local:this.local
    
      }
      this.curdService.saveForm(input_data).subscribe(async response => {
        this.loadingController.dismiss();
        const toast = await this.toastController.create({

          message: 'Saved Successfully',
          duration: 1500,
          position: 'top',
          color: 'success'
        });
        await toast.present();
        this.loadingController.dismiss();
        this.client_name = '',
          this.phone1 = '';
        this.pmt_vote = 0,
          this.flt_vote = 0
        console.log(this.phone1)
        // this.router.navigate(['data-list']);
      }, async error => {
        this.loadingController.dismiss();
        console.error('Error:', error);
        if (error.error.phone1[0] == 'vote data model with this phone1 already exists.') {
          const toast = await this.toastController.create({
            message: 'This phone number already exists',
            duration: 1500,
            position: 'top',
            color: 'danger',
          });
          await toast.present();
        }
        // Handle error here
      });
    }
  }


  goMyData() {
    this.router.navigate(['my-data']);
  }

  goToProfile() {
    this.router.navigate(['profile']);
  }

  addData() {
    this.router.navigate(['data-form']);
  }

  showSmmery() {
    this.router.navigate(['data-summery']);
  }

  dataList() {
    this.router.navigate(['data-list']);
  }

}

