import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { Restaurant } from '../restaurant';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  isCategory:boolean = true;
  message:string='';
  getAllMenuItemsRest:Restaurant[]=[]; 
  clickRest:Restaurant = new Restaurant(0,'','','',0,0,'',0,0,'',0,'','','');
  categoryRest : Restaurant[]=[];
  placeOrderRest : Restaurant = new Restaurant(0,'','','',0,0,'',0,0,'',0,'','','');

  constructor(private customerService:CustomerService){
    this.getAllMenuItems();
  }

  getAllMenuItems() {
    this.customerService.getAllMenuItems().subscribe(
      (data: Restaurant[]) => {
         data.map(item => {
           item.image = 'data:image/jpeg;base64,' + item.image ;
        });
        this.getAllMenuItemsRest = data;
      },
      (error) => {
        console.error('Error fetching menu items:', error);
      }
    );
  }
  click(rest:Restaurant){
    this.clickRest = rest;
  }


  category(categ: string): void {
    this.customerService.getCategory(categ).subscribe(
      (data) => {
        if (data && data.length > 0) {
          data.forEach(item => {
            item.image = 'data:image/jpeg;base64,' + item.image;
          });
          this.categoryRest = data;
          this.isCategory = true;
          this.message = '';
        } else {
          this.isCategory = false;
          this.categoryRest = [];
          this.message = 'No Items Available';
        }
      },
      (error) => {
        console.error('Error fetching category:', error);
        this.message = 'Error fetching category data.';
        this.isCategory = false;
      }
    );
  }
  
  placeOrder(rest: Restaurant) {
    if (rest.image && rest.image.startsWith('data:image/jpeg;base64,')) {
      rest.image = rest.image.replace('data:image/jpeg;base64,', '');
    }
  
    this.customerService.placeOrder(rest).subscribe(
      (data) => {
        if (data && data.image) {
          data.image = 'data:image/jpeg;base64,' + data.image;
        }
        if (data !== null) {
          this.message = 'Added item ' + this.clickRest.name;
        } else {
          this.message = 'Order data is null';
        }
        this.getAllMenuItems();
            },
      (error) => {
        console.error('Error placing order:', error);
        this.message = 'Failed to add item ' + this.clickRest.name;
      }
    );
  }
  
  

}
