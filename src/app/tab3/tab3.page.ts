import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {

  title = "Grocery List";

  items = [
    {
      name: "Milk",
      qty: 2
    },
    {
      name: "Bread",
      qty: 3
    },
    {
      name: "Eggs",
      qty: 4
    }
  ];

  constructor(public navCtrl: NavController, 
    public toastController: ToastController, 
    public alertController: AlertController,
    private zone: NgZone) { }


  async removeItem(item, index) {
    console.log("Removing Item - ", item, index);
    const toast = await this.toastController.create({
      message: 'Removing Item - ' + item.name + " ...",
      duration: 3000
    });
    toast.present();

    this.items.splice(index, 1);
  }

  addItem() {
    console.log("Attempt to add item");
    this.showItemPrompt();

  }

  async showItemPrompt() {
    const alert = await this.alertController.create({
      header: 'Add Grocery Item',
      message: "enter a grocery item now",
      inputs: [
        {
          name: 'name',
          placeholder: 'name'
        },
        {
          name: 'qty',
          placeholder: 'quantity'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: item => {
            console.log('Confirm Ok');
            this.items.push(item)
          }
        }
      ]
    });

    await alert.present();
  }

async editItem(item, i) {
    console.log("Editing Item - ", item, i);
    const toast = await this.toastController.create({
      message: 'Editing Item - ' + item.name + " ...",
      duration: 1000
    });
    toast.present();
    this.showEditItemPrompt(item, i);
  }

  refresh() {
    this.zone.run(() => {
      console.log('force update the screen');
    });
  }

async showEditItemPrompt(item , i) {
     const alert = await this.alertController.create({
      header: 'Edit Grocery Item',
      message: "edit exsisting item",
      inputs: [
        {
          name: 'name',
          placeholder: 'name',
          value: item.name
        },
        {
          name: 'qty',
          placeholder: 'quantity',
          value: item.qty
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, 
        {
          text: 'Save',
          handler: item => {
            console.log('Confirmed Save', item);
            this.items[i] = item;
          }
        }
      ]
    });
   await alert.present();
   //I don't know why screen won't update
  }
}
