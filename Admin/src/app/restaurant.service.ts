import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from './restaurant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http:HttpClient) { }

  getCustomerById(id:number){
    return this.http.get(`http://localhost:8081/api/customer/getCust/${id}`)
  }
  getAllCustomers():Observable<Restaurant>{
    return this.http.get<Restaurant>("http://localhost:8081/api/customer/getAllCust")
  }
  addMenuItem(restaurant:Restaurant){
    return this.http.post<Restaurant>("http://localhost:8081/api/menu/addMenu",restaurant);
  }
  updateMenuItem(restaurant:Restaurant):Observable<Restaurant>{
    return this.http.put<Restaurant>("http://localhost:8081/api/menu/update",restaurant)
  }
  removeMenuItem(id: number) {
    return this.http.delete(`http://localhost:8081/api/menu/remove/${id}`);
  }
  getAllMenuItems(){
    return this.http.get<Restaurant[]>("http://localhost:8081/api/menu/all");
  }

  updateOrder(tableid: number ,time:number , status:string){
    return this.http.put<Restaurant>("http://localhost:8081/api/table/updateOrder",{tableid ,time,status});
  }
  placeOrder(rest:Restaurant){
    return this.http.put<Restaurant>("http://localhost:8081/api/table/placeOrder",rest);
  }

  getOrderById(id:number){
    return this.http.get(`http://localhost:8081/api/table/getOrderById/${id}`);
  }
  
  getAllTableOrders():Observable<Restaurant[]>{
    return this.http.get<Restaurant[]>("http://localhost:8081/api/table/getAllOrders");
  }
  getCategory(categ:string){
    return this.http.get<Restaurant[]>(`http://localhost:8081/api/menu/getCategory/${categ}`);
  }
  saveCustomerOrder(rest:Restaurant[]){
    return this.http.post<Restaurant[]>("http://localhost:8081/api/customer/saveOrder",rest);
  }
  cancelOrder(id:number){
    return this.http.delete(`http://localhost:8081/api/table/cancelOrder/${id}`)
  }
  clearTable(tableid:number){
    return this.http.delete(`http://localhost:8081/api/table/clearTable/${tableid}`)
  }
}
