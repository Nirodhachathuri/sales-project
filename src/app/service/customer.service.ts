import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl: string;
  constructor(private http : HttpClient) {
    this.baseUrl = `http://localhost:3000/api`
   }

  archiveCustomers(customerId: string): Observable<any> {
    const url = `${this.baseUrl}/customers/archive/${customerId}`;
    return this.http.put<any>(url, {});
  }

  saveCustomersDetails(customerDetails: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/customer-add`, customerDetails);
  }

  getAllSales(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-sales`);
  }

  updateCustomers(customerData: any): Observable<any> {
    const customerId = customerData.id;
    return this.http.put<any>(`${this.baseUrl}/customer/${customerId}`, customerData);
  }

  getCustomersReps(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getcustomers`);
  }
}
