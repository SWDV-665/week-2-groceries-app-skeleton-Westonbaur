import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { NgZone } from '@angular/core';
import { GroceriesServiceService } from '../groceries-service.service';
import { InputDialogServiceService } from '../input-dialog-service.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {

  title = "Grocery List";

  constructor(public navCtrl: NavController, 
    public toastController: ToastController, 
    public alertController: AlertController,
    private zone: NgZone,
    public dataService: GroceriesServiceService,
    public InputDialogService: InputDialogServiceService,
    public socialSharing: SocialSharing
    )
    { }

  loadItems(){
    return this.dataService.getItems();
  }


  async removeItem(item, index) {
    console.log("Removing Item - ", item, index);
    const toast = await this.toastController.create({
      message: 'Removing Item - ' + item.name + " ...",
      duration: 3000
    });
    toast.present();

    this.dataService.removeItem(index);
  }

  addItem() {
    console.log("Attempt to add item");
    this.InputDialogService.showPrompt();
  }

  async editItem(item, i) {
    console.log("Editing Item - ", item, i);
    const toast = await this.toastController.create({
      message: 'Editing Item - ' + item.name + " ...",
      duration: 1000
    });
    toast.present();
    this.InputDialogService.showPrompt(item, i);
  }

  refresh() {
    this.zone.run(() => {
      console.log('force update the screen');
    });
  }

  async shareItem(item, index) {
    console.log("Sharing Item - ", item, index);
    const toast = await this.toastController.create({
      message: 'Sharing Item - ' + item.name + " ...",
      duration: 3000
    });
    toast.present();

    let message = "Grocer Item - Name: " + item.name + " - Quantity: " + item.Quantity;
    let subject = "Shared via Groceries app";
    this.socialSharing.share(message, subject).then(() => {
        console.log("Shared successfully")
    }).catch((error) => {
      console.error("Error while sharing", error);
    });

  }

}
