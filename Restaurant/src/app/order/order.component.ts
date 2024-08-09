import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { Restaurant } from '../restaurant';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  getOrderItemsRest: Restaurant[] = [];
  subtotal: number = 0;
  orderStatus:string = '';
  isView:boolean = false;
  message:string = '';

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getOrderItems();
  }

  getOrderItems(): void {
    this.customerService.getOrderItems().subscribe(
      (data: Restaurant[]) => {
        this.getOrderItemsRest = data;
        for(let rest of data){
          if(rest.placeorder ==='Confirm'){
            this.isView = true;
          }else{
            this.isView = false;
          }
          if(rest.status !== null){
            if(rest.status === 'Reserved'){
              this.orderStatus = 'Waiting';
            }
            else{
              this.orderStatus = rest.status;
            }
          }
        }
      }
    );
  }
  updateOrder(){
      this.customerService.updateOrder(this.getOrderItemsRest).subscribe(
        (data: Restaurant[]) => {
          if(data){
            this.isView = true;
          }
        }
      );
  }
  deleteOrder(id:number){
    this.customerService.deleteOrder(id).subscribe(
      (data: Restaurant) => {
        this.message = 'Deleted Item '+ data.name ;
        this.getOrderItems();
      }
    );
  }

}
