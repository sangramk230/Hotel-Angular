import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RestaurantService } from '../restaurant.service';
import { Restaurant } from '../restaurant';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  placeOrderRest: Restaurant = new Restaurant(0, '', '', '', 0, 0, '', 0, 0, '', 0, '', '', '');
  getAllTableOrdrsRest: Restaurant[] = [];
  billRest: Restaurant[] = [];
  tableIdsSet: Set<number> = new Set<number>(); 
  total: number = 0;
  dailyIncome: number = 0;
  tableid: number = 0;
  id: number = 0;
  status: string = '';
  time: number = 0;
  updateOrderRest: Restaurant = new Restaurant(0, '', '', '', 0, 0, '', 0, 0, '', 0, '', '', '');

  constructor(private restaurantService: RestaurantService) {
    this.getAllTableOrders();
  }

  getAllTableOrders() {
    this.restaurantService.getAllTableOrders().subscribe(
      (data: Restaurant[]) => {
        // Clear previous table IDs and reset the array
        this.tableIdsSet.clear();
        this.getAllTableOrdrsRest = [];

        // Filter the data and group by table ID
        data.forEach(rest => {
          if (rest.status !== null) {
            this.tableIdsSet.add(rest.tableid);
            this.getAllTableOrdrsRest.push(rest);
          }
        });

        // Debugging: log the filtered table IDs and orders
        console.log("Filtered table IDs: ", Array.from(this.tableIdsSet));
        console.log("Filtered table orders: ", this.getAllTableOrdrsRest);
      },
      (error) => {
        console.error('Error fetching table orders', error);
      }
    );
  }

  bill(tableid: number) {
    this.billRest = this.getAllTableOrdrsRest.filter(order => order.tableid === tableid);
    this.tableid = tableid;
  }

  saveOrder() {
    this.restaurantService.saveCustomerOrder(this.getAllTableOrdrsRest).subscribe(() => {
      this.getAllTableOrdrsRest.forEach(rest => {
        this.clearTable(rest.tableid);
      });
    });
  }

  clearTable(tableid: number) {
    this.restaurantService.clearTable(tableid).subscribe();
  }

  updateOrder(time: number, status: string) {
    this.restaurantService.updateOrder(this.tableid, time, status).subscribe(
      (data) => {
        this.tableid = data.tableid;
      },
      (error) => {
        console.error('Error updating order:', error);
      }
    );
  }
}
