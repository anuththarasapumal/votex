import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { CurdService } from 'src/app/services/curd.service';
import { AlertController, ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { FormDataEditPage } from 'src/app/pages/form-data-edit/form-data-edit.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  interval: any;
  my_data_id: any;
  items: any[] = [];
  filteredContacts: any[] = [];
  search_results = false
  poliparty_list: any = [];
  all_user_data = { user_name: '', superuser_id: '', user_id: '', gnd_id: '', poli_party_id: '', }

  constructor(
    private curdService: CurdService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private alertController: AlertController,
    private modalController: ModalController,
    private toastController: ToastController,
  ) { }


  ionViewWillEnter() {
    this.storage.create();
    this.loadStorageData();
    this.myData();
  }

  // Load data

  async loadStorageData() {
    this.all_user_data = await this.storage.get('loged_user_data');
    this.getPolipartyData()
  }

  // View profile

  goToProfile() {
    this.router.navigate(['profile']);
  }

  // get GND Data

  getPolipartyData() {
    this.curdService.getPoliparty().subscribe(poliparty_res => {
      this.poliparty_list = poliparty_res;
      console.log(this.poliparty_list)
      this.myData();
    }, error => {
      console.error('Error:', error);
    });
  }

  myData() {
    this.curdService.getUserVoteData(this.all_user_data.gnd_id).subscribe(response => {
      this.filteredContacts = response;
      for (let item of this.filteredContacts) {
        console.log(item.party_id)
        console.log(this.filteredContacts)
        let party_name = this.poliparty_list.filter((obj: { id: any; }) => obj.id == item.party_id)
        console.log(party_name)
        item.party_name  =party_name[0].name_short
      }
      this.items = response;
      this.filteredContacts = this.filteredContacts.sort((n1, n2) => n2.id - n1.id)
      this.items = response;

    }, error => {
      console.error('Error:', error);
      this.search_results = true
    });
  }

  // Filter array

  filterContacts(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (!searchTerm) {
      this.filteredContacts = this.items;
      return;
    }
    this.filteredContacts = this.items.filter(contact => {
      return (
        contact.client_name.toLowerCase().includes(searchTerm) ||
        contact.phone1.includes(searchTerm) ||
        contact.nic.toLowerCase().includes(searchTerm)
      );
    });
    if (this.filteredContacts.length == 0 || this.items.length) {
      this.search_results = true
    } else {
      this.search_results = false

    }
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
              this.myData()
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
    const modal = await this.modalController.create({
      component: FormDataEditPage,
      componentProps: {
        data: item // Pass your data here
      }
    });
    this.doRefresh()
    await modal.present();
  }

  // refresh

  doRefresh() {
    this.interval = setInterval(() => {
      this.myData();
    }, 5000);
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

  showVoter(id: any) {
    this.router.navigate(['vote-show', id]);
  }
}


