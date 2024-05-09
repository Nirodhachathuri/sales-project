import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAllShopNames(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/api/get-shopNames`);
  }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/api/get-products`);
  }
  
  saveOrderDetails(orderDetails): Observable<any[]> {
    return this.http.post<any[]>(`http://localhost:3000/api/order-add`, orderDetails);
  }

  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/api/get-orders`);
  }

  archiveOrders(orderId: string): Observable<any> {
    const url = `http://localhost:3000/api/orders/archive/${orderId}`;
    return this.http.put<any>(url, {});
  }

  deliveredOrders():Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:3000/api/get-deliveredOrders`);
  }
  
  updateOrders(ordersData: any): Observable<any> {
    const orderId = ordersData.id;
    return this.http.put<any>(`http://localhost:3000/api/orders/${orderId}`, ordersData);
  }

}
