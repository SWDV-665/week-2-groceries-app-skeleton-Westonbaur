import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from './groceries-service.service';

@Injectable({
  providedIn: 'root'
})

export class InputDialogServiceService {

  constructor(public dataService: GroceriesServiceService, public alertController: AlertController) { }

  async showPrompt(item? , index?) {
    const alert = await this.alertController.create({
     header: item? 'Edit Grocery Item' : 'Add Item',
     message: item? "Edit exsisting item": "Please Enter Item",
     
     inputs: [
       {
         name: 'name',
         placeholder: 'name',
         value:item ?  item.name : null
       },
       {
         name: 'qty',
         placeholder: 'quantity',
         value: item? item.qty : null
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
           console.log('Confirmed Save', item)
           if (index !== undefined) {
             this.dataService.editItem(item, index);
           }
           else{
             this.dataService.addItem(item);
           }
         }
       }
     ]
   });
  await alert.present();

 }  

}
