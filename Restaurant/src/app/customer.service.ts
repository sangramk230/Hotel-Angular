import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from './restaurant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  getAllMenuItems():Observable<Restaurant[]>{
    return this.http.get<Restaurant[]>("http://localhost:8080/api/order/getAllMenuItems");
  }
  getCategory(categ:string){
    return this.http.get<Restaurant[]>(`http://localhost:8080/api/order/getCategory/${categ}`);
  }
  placeOrder(rest:Restaurant){
    return this.http.post<Restaurant>("http://localhost:8080/api/order/placeOrder",rest);
  }
  getOrderItems():Observable<Restaurant[]>{
    return this.http.get<Restaurant[]>("http://localhost:8080/api/order/getOrderItems");
  }
  updateOrder(rest:Restaurant[]){
    return this.http.put<Restaurant[]>(`http://localhost:8080/api/order/update`,rest);
  }
  deleteOrder(id:number){
    return this.http.delete<Restaurant>(`http://localhost:8080/api/order/delete/${id}`);
  }
}
