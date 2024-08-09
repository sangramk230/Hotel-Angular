import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RestaurantService } from '../restaurant.service';
import { Restaurant } from '../restaurant';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  getAllTableOrdersRest: Restaurant[] = [];
  tableIdsSet: Set<number> = new Set<number>();
  checkRest: Restaurant[] = [];
  updateOrderRest: Restaurant = new Restaurant(0, '', '', '', 0, 0, '', 0, 0, '', 0, '', '', '');
  tableid: number = 0;
  status: string = '';
  placeorder: string = '';
  time: number = 0;
  freeTables: number[] = [1, 2, 3];

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.getAllTableOrders();
  }

  getAllTableOrders(): void {
    this.restaurantService.getAllTableOrders().subscribe(
      (data: Restaurant[]) => {
        this.tableIdsSet.clear();
        this.getAllTableOrdersRest = data.filter(rest => rest.status === null && rest.placeorder !== null);

        this.getAllTableOrdersRest.forEach(rest => this.tableIdsSet.add(rest.tableid));
        
        console.log("Filtered table IDs:", Array.from(this.tableIdsSet));
      },
      (error: any) => {
        console.error('Error fetching table orders', error);
      }
    );
  }

  check(tableId: number): void {
    this.tableid = tableId;
    this.checkRest = this.getAllTableOrdersRest.filter(order => order.tableid === tableId);
  }

  updateOrder(time: number, status: string): void {
    this.restaurantService.updateOrder(this.tableid, time, status).subscribe(
      () => {
        this.getAllTableOrders();
      },
      (error: any) => {
        console.error('Error updating order:', error);
      }
    );
  }
}
