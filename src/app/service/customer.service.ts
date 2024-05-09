import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http : HttpClient) { }

  archiveCustomers(customerId: string): Observable<any> {
    const url = `http://localhost:3000/api/customers/archive/${customerId}`;
    return this.http.put<any>(url, {});
  }

  saveCustomersDetails(customerDetails: any): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/api/customer-add`, customerDetails);
  }

  getAllSales(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/api/get-sales`);
  }

  updateCustomers(customerData: any): Observable<any> {
    const customerId = customerData.id;
    return this.http.put<any>(`http://localhost:3000/api/customer/${customerId}`, customerData);
  }

  getCustomersReps(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/getcustomers');
  }
}
