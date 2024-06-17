import { Component, OnInit } from '@angular/core';
import { LoadingController, NavParams, ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { CurdService } from 'src/app/services/curd.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-data-edit',
  templateUrl: './form-data-edit.page.html',
  styleUrls: ['./form-data-edit.page.scss'],
})
export class FormDataEditPage implements OnInit {

  pmt_vote = 0;
  flt_vote = 0;
  client_name = '';
  phone1 = '';
  id = '';
  party_id='';
  nic='';
  local='';
  address='';

  receivedData = {
    pmt_vote:0,
    flt_vote:0,
    client_name:'',
    phone1:'',
    id:'',
    party_id:'',
    nic:'',
    local:'',
    address:''
  }
  poliparty_list:any=[];

  all_user_data = { user_name: '', superuser_id: '', user_id: '', gnd_id: '', poli_party_id: '', }

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private curdService: CurdService,
    private toastController: ToastController,
    private storage: Storage,
    private router: Router,
    public loadingController: LoadingController

  ) { }

  ngOnInit() {
    this.storage.create();
    this.loadStorageData();
    this.getPolipartyData();
    this.receivedData = this.navParams.get('data');
    this.pmt_vote = this.receivedData.pmt_vote;
    this.flt_vote = this.receivedData.flt_vote;
    this.client_name = this.receivedData.client_name;
    this.phone1 = this.receivedData.phone1;
    this.id = this.receivedData.id;
    this.nic = this.receivedData.nic;
    this.local=this.receivedData.local,
     this.address=this.receivedData.address
this.party_id= this.receivedData.party_id;
    console.log(this.receivedData.party_id)
  }

  getPolipartyData() {
    this.curdService.getPoliparty().subscribe(poliparty_res => {
      this.poliparty_list = poliparty_res;
      console.log(this.poliparty_list)
    }, error => {
      console.error('Error:', error);
    });
  }

// load storage data

  async loadStorageData() {
    this.all_user_data = await this.storage.get('loged_user_data');
    console.log('User data saved:', this.all_user_data);
  }

  back() {
    this.router.navigate(['data-list']);
    this.modalController.dismiss();
  }

  // update data

  async saveData() {
    const loading = await this.loadingController.create({
      spinner: 'circles',
      message: 'Updating...',
      cssClass: 'custom-loading',
    });
    if (this.pmt_vote == 0 && this.flt_vote == 0) {
      this.loadingController.dismiss();
      const toast = await this.toastController.create({
        message: 'You must fill permanent vote or floating vote',
        duration: 1500,
        position: 'top',
        color: 'danger',
      });
      await toast.present();
    } else {
      let input_data = {
        user_name: this.all_user_data.user_name,
        superuser_id: this.all_user_data.superuser_id,
        gnd_id: this.all_user_data.gnd_id,
        client_name: this.client_name,
        phone1: this.phone1,
        pmt_vote: this.pmt_vote,
        flt_vote: this.flt_vote,
        id: this.id,
        party_id:this.party_id,
        local:this.local,
        nic:this.nic,
        edited:true,
        address:this.address

      };
      this.curdService.editVoteData(input_data).subscribe(async response => {
      this.loadingController.dismiss();
        this.modalController.dismiss();
        const toast = await this.toastController.create({
          message: 'Saved Successfully',
          duration: 1500,
          position: 'top',
          color: 'success'
        });

        await toast.present();
        console.log('Response:', response);
      }, error => {
      this.loadingController.dismiss();
        console.error('Error:', error);
        // Handle error here
      });
    }
  }

}
