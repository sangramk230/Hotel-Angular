import { Component } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { Restaurant } from '../restaurant';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  isView:boolean=false;
  isAdd:boolean = false;
  isCategory:boolean = true;
  getAllMenuItemsRest : Restaurant[]=[];
  categoryRest : Restaurant[]=[];

  addMenuRest:Restaurant = new Restaurant(0,'','','',0,0,'',0,0,'',0,'','',''); 
  clickRest:Restaurant = new Restaurant(0,'','','',0,0,'',0,0,'',0,'','',''); 
  message:string='';


  constructor(private restaurantService:RestaurantService) {
    this.getAllMenuItems();
  }
  clearMessageAfterDelay() {
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }


  handleFileInput(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        this.addMenuRest.image = base64String;
      };
      reader.readAsDataURL(file); 
    }
  }
  addMenu(): void {
    this.restaurantService.addMenuItem(this.addMenuRest).subscribe(
      (data) => {
        this.message = 'Item Added';
        this.clearMessageAfterDelay();
          this.addMenuRest = new Restaurant(0, '', '', '', 0, 0, '', 0, 0, '', 0, '','','');
      },
      (error) => {
        console.error('Error adding menu item:', error);
      }
    );
  }
  
    getAllMenuItems() {
      this.restaurantService.getAllMenuItems().subscribe(
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
    clickView(): void {
      this.isView = true;
    }

    goBack(): void {
      this.isView = false;
    }

    removeMenuItem(id:number){
      this.restaurantService.removeMenuItem(id).subscribe(
        (data)=>{
          this.message = 'Item Deleted'
          this.clearMessageAfterDelay();
        }
      )
    }
    category(categ: string): void {
      this.restaurantService.getCategory(categ).subscribe(
        (data) => {
          if (data && data.length > 0) {
            data.forEach(item => {
              item.image = 'data:image/jpeg;base64,' + item.image;
            });
            this.categoryRest = data;
            this.isCategory = true;
            this.message = '';
          } else {
            this.categoryRest = [];
            this.isCategory = false;
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
    
}
