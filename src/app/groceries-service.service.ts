import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroceriesServiceService {
  
  items = [
    {
      name: "Banana",
      qty: 5
    }

  ];

  constructor() { 
    console.log('Hello GroceriesServiceProvider Provider')
  }

  getItems() {
    return this.items;
  }

  async removeItem(index) {
    this.items.splice(index, 1);
  }

  addItem(item) {
    this.items.push(item);
  }

  editItem(item, index){
    this.items[index] = item;
  }

}
