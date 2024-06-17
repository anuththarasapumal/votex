import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { CurdService } from 'src/app/services/curd.service';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormDataEditPage } from 'src/app/pages/form-data-edit/form-data-edit.page';


@Component({
  selector: 'app-vote-show',
  templateUrl: './vote-show.page.html',
  styleUrls: ['./vote-show.page.scss'],
})
export class VoteShowPage implements OnInit {


  poliparty_list: any = [];
  _id: any
  filtered_vote = {
    client_name: '',
    address: '',
    agent_name: '',
    flt_vote: '',
    nic: '',
    phone1: '',
    pmt_vote: '',
    user_name: '',
    id:''
  };

  constructor(
    private toastController: ToastController,
    public loadingController: LoadingController,
    private curdService: CurdService,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private modalController: ModalController,

  ) { }

  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get('id');
    this.getUserVoteData();
  }

  getPolipartyData() {
    this.curdService.getPoliparty().subscribe(poliparty_res => {
      this.poliparty_list = poliparty_res;
      console.log(this.poliparty_list)
    }, error => {
      console.error('Error:', error);
    });
  }

  getUserVoteData() {
    this.curdService.getUserUser(this._id).subscribe(response => {
      this.filtered_vote = response[0];
      console.log(this.filtered_vote)
    }, error => {
      console.error('Error:', error);
    });
  }

  // delete record

  async onDelete(id: any) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.curdService.deleteVoteData(id).subscribe(async response => {
              this.router.navigate(['data-list']);
              const toast = await this.toastController.create({
                message: 'Deleted Successfully',
                duration: 1500,
                position: 'top',
                color: 'success'
              });

              await toast.present();
            }, error => {
              console.error('Error:', error);
              // Handle error here
            });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
  }

  // edit data

  async onEdit(item: any) {
    console.log(item)
    const modal = await this.modalController.create({
      component: FormDataEditPage,
      componentProps: {
        data: this.filtered_vote // Pass your data here
      }
    });
    await modal.present();
  }

  back() {
    this.router.navigate(['data-list']);
  }





}
