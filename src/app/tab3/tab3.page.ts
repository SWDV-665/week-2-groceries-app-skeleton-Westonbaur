import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

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

  constructor(public navCtrl: NavController, public toastController: ToastController, public alertController: AlertController) {}


  async removeItem(item, index){
    console.log("Removing Item - ", item, index);
    const toast = await this.toastController.create({
      message: 'Removing Item - ' + item.name + " ...",
      duration: 3000
      });
      toast.present();

      this.items.splice(index, 1);
    }

addItem(){
  console.log("Attempt to add item");
  this.showItemPrompt();

}

async showItemPrompt(){
  const alert = await this.alertController.create({
    header: 'Add Grocery Item',
    message: "enter a custom grocery item now",
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
        cssClass: 'secondary',
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


}
